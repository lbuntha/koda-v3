export type AssetType = "image" | "audio";

export interface AssetManifestEntry {
  type: AssetType;
  src: string;
  width?: number;
  height?: number;
  tags: string[];
}

export interface AssetManifest {
  version: string;
  assets: Record<string, AssetManifestEntry>;
}

export function getAsset(manifest: AssetManifest, assetKey: string): AssetManifestEntry | undefined {
  return manifest.assets[assetKey];
}
