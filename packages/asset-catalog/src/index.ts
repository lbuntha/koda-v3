export type AssetType = "image" | "audio";
export type AssetKey = string;

export interface AssetMetadata {
  key: AssetKey;
  type: AssetType;
  src: string;
  width?: number;
  height?: number;
  tags: string[];
  placeholder?: boolean;
}

export interface AssetManifestEntry {
  type: AssetType;
  src: string;
  width?: number;
  height?: number;
  tags: string[];
  placeholder?: boolean;
}

export interface AssetManifest {
  version: string;
  assets: Record<AssetKey, AssetManifestEntry>;
}

export interface AssetManifestPair {
  key: AssetKey;
  asset: AssetManifestEntry;
}

export interface AssetValidationResult {
  valid: boolean;
  errors: string[];
}

export interface ActivityAssetSelection {
  requiredKeys: AssetKey[];
  assets: AssetMetadata[];
  missingKeys: AssetKey[];
}

export const missingAssetFallback: AssetMetadata = {
  key: "placeholder.missing-asset",
  type: "image",
  src: "/assets/placeholders/missing-asset.svg",
  width: 256,
  height: 256,
  tags: ["placeholder", "missing-asset"],
  placeholder: true
};

const assetKeyFields = new Set(["assetKey", "audioKey", "backgroundAssetKey"]);
const validAssetTypes = new Set<AssetType>(["image", "audio"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateEntry(key: string, value: unknown): string[] {
  const errors: string[] = [];

  if (!key) {
    errors.push("Asset key must not be empty.");
  }

  if (!isRecord(value)) {
    return [`Asset ${key || "<empty>"} must be an object.`];
  }

  if (typeof value.type !== "string" || !validAssetTypes.has(value.type as AssetType)) {
    errors.push(`Asset ${key} requires type image or audio.`);
  }

  if (typeof value.src !== "string" || value.src.length === 0) {
    errors.push(`Asset ${key} requires a non-empty source.`);
  }

  if (value.width !== undefined && (typeof value.width !== "number" || value.width <= 0)) {
    errors.push(`Asset ${key} width must be a positive number when provided.`);
  }

  if (value.height !== undefined && (typeof value.height !== "number" || value.height <= 0)) {
    errors.push(`Asset ${key} height must be a positive number when provided.`);
  }

  if (!Array.isArray(value.tags) || value.tags.some((tag) => typeof tag !== "string")) {
    errors.push(`Asset ${key} requires string tags.`);
  }

  return errors;
}

export function validateAssetManifest(manifest: unknown): AssetValidationResult {
  const errors: string[] = [];

  if (!isRecord(manifest)) {
    return { valid: false, errors: ["Asset manifest must be an object."] };
  }

  if (typeof manifest.version !== "string" || manifest.version.length === 0) {
    errors.push("Asset manifest requires a non-empty version.");
  }

  if (!isRecord(manifest.assets)) {
    errors.push("Asset manifest requires an assets object.");
  } else {
    Object.entries(manifest.assets).forEach(([key, entry]) => {
      errors.push(...validateEntry(key, entry));
    });
  }

  return { valid: errors.length === 0, errors };
}

export function validateAssetManifestPairs(
  version: string,
  pairs: AssetManifestPair[]
): AssetValidationResult {
  const errors: string[] = [];
  const seenKeys = new Set<string>();

  if (!version) {
    errors.push("Asset manifest requires a non-empty version.");
  }

  pairs.forEach((pair) => {
    if (seenKeys.has(pair.key)) {
      errors.push(`Duplicate asset key: ${pair.key}.`);
    }

    seenKeys.add(pair.key);
    errors.push(...validateEntry(pair.key, pair.asset));
  });

  return { valid: errors.length === 0, errors };
}

export function createAssetManifestFromPairs(
  version: string,
  pairs: AssetManifestPair[]
): AssetManifest {
  const validation = validateAssetManifestPairs(version, pairs);

  if (!validation.valid) {
    throw new Error(validation.errors.join(" "));
  }

  return {
    version,
    assets: pairs.reduce<Record<AssetKey, AssetManifestEntry>>((assets, pair) => {
      assets[pair.key] = pair.asset;
      return assets;
    }, {})
  };
}

export function resolveAssetKey(
  manifest: AssetManifest,
  assetKey: AssetKey,
  fallback: AssetMetadata = missingAssetFallback
): AssetMetadata {
  const entry = manifest.assets[assetKey];

  if (!entry) {
    return { ...fallback, key: assetKey, placeholder: true };
  }

  return {
    key: assetKey,
    ...entry
  };
}

export function selectRequiredActivityAssetKeys(activityDefinition: unknown): AssetKey[] {
  const keys = new Set<AssetKey>();

  function visit(value: unknown, fieldName?: string): void {
    if (typeof value === "string" && fieldName && assetKeyFields.has(fieldName)) {
      keys.add(value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => visit(item));
      return;
    }

    if (isRecord(value)) {
      Object.entries(value).forEach(([key, nestedValue]) => visit(nestedValue, key));
    }
  }

  visit(activityDefinition);
  return [...keys].sort();
}

export function selectPreloadAssets(
  manifest: AssetManifest,
  activityDefinition: unknown
): ActivityAssetSelection {
  const requiredKeys = selectRequiredActivityAssetKeys(activityDefinition);
  const assets = requiredKeys.map((key) => resolveAssetKey(manifest, key));
  const missingKeys = assets
    .filter((asset) => asset.placeholder)
    .map((asset) => asset.key);

  return {
    requiredKeys,
    assets,
    missingKeys
  };
}

export class AssetCatalogService {
  private readonly manifest: AssetManifest;
  private readonly fallback: AssetMetadata;

  constructor(manifest: AssetManifest, fallback: AssetMetadata = missingAssetFallback) {
    const validation = validateAssetManifest(manifest);

    if (!validation.valid) {
      throw new Error(validation.errors.join(" "));
    }

    this.manifest = manifest;
    this.fallback = fallback;
  }

  getManifestVersion(): string {
    return this.manifest.version;
  }

  resolve(assetKey: AssetKey): AssetMetadata {
    return resolveAssetKey(this.manifest, assetKey, this.fallback);
  }

  selectPreloadAssets(activityDefinition: unknown): ActivityAssetSelection {
    return selectPreloadAssets(this.manifest, activityDefinition);
  }
}
