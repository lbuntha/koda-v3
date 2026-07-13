import { describe, expect, it } from "vitest";

import {
  AssetCatalogService,
  createAssetManifestFromPairs,
  resolveAssetKey,
  selectPreloadAssets,
  selectRequiredActivityAssetKeys,
  validateAssetManifest,
  validateAssetManifestPairs,
  type AssetManifest,
  type AssetManifestPair
} from "../index";

const validManifest: AssetManifest = {
  version: "1.0.0",
  assets: {
    "background.sample": {
      type: "image",
      src: "/assets/backgrounds/sample.png",
      width: 1920,
      height: 1080,
      tags: ["background"]
    },
    "object.sample": {
      type: "image",
      src: "/assets/objects/sample.png",
      width: 256,
      height: 256,
      tags: ["object"]
    },
    "audio.sample.instruction": {
      type: "audio",
      src: "/assets/audio/sample.mp3",
      tags: ["audio", "instruction"]
    }
  }
};

const activityDefinition = {
  id: "activity-001",
  type: "sample-activity",
  title: "Sample activity",
  instruction: {
    text: "Use the sample learning object.",
    audioKey: "audio.sample.instruction"
  },
  scene: {
    backgroundAssetKey: "background.sample"
  },
  objects: {
    items: [
      {
        id: "item-1",
        assetKey: "object.sample"
      }
    ]
  }
};

describe("asset manifest validation", () => {
  it("accepts a valid manifest", () => {
    expect(validateAssetManifest(validManifest)).toEqual({
      valid: true,
      errors: []
    });
  });

  it("detects duplicate keys when manifest entries are provided as pairs", () => {
    const pairs: AssetManifestPair[] = [
      {
        key: "object.sample",
        asset: validManifest.assets["object.sample"]
      },
      {
        key: "object.sample",
        asset: validManifest.assets["object.sample"]
      }
    ];

    const result = validateAssetManifestPairs("1.0.0", pairs);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Duplicate asset key: object.sample.");
    expect(() => createAssetManifestFromPairs("1.0.0", pairs)).toThrow(
      "Duplicate asset key"
    );
  });

  it("rejects an asset with a missing source", () => {
    const manifest = {
      version: "1.0.0",
      assets: {
        "object.sample": {
          type: "image",
          tags: ["object"]
        }
      }
    };

    const result = validateAssetManifest(manifest);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Asset object.sample requires a non-empty source.");
  });
});

describe("asset key resolution", () => {
  it("returns the missing-asset fallback for an unknown asset key", () => {
    const asset = resolveAssetKey(validManifest, "object.unknown");

    expect(asset.key).toBe("object.unknown");
    expect(asset.placeholder).toBe(true);
    expect(asset.src).toBe("/assets/placeholders/missing-asset.svg");
  });

  it("resolves known assets through the catalog service", () => {
    const service = new AssetCatalogService(validManifest);

    expect(service.resolve("object.sample")).toEqual({
      key: "object.sample",
      ...validManifest.assets["object.sample"]
    });
  });
});

describe("activity preload selection", () => {
  it("selects required activity assets from asset key fields", () => {
    expect(selectRequiredActivityAssetKeys(activityDefinition)).toEqual([
      "audio.sample.instruction",
      "background.sample",
      "object.sample"
    ]);

    const selection = selectPreloadAssets(validManifest, activityDefinition);

    expect(selection.requiredKeys).toEqual([
      "audio.sample.instruction",
      "background.sample",
      "object.sample"
    ]);
    expect(selection.assets).toHaveLength(3);
    expect(selection.missingKeys).toEqual([]);
  });

  it("reports missing required activity assets", () => {
    const selection = selectPreloadAssets(validManifest, {
      instruction: {
        audioKey: "audio.unknown"
      }
    });

    expect(selection.missingKeys).toEqual(["audio.unknown"]);
  });
});
