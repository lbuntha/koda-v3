import { useEffect } from "react";

import type { ActivityRuntimeAdapter } from "../Activity.types";
import type { RuntimeBridge } from "./RuntimeBridge";

export function RuntimeHost({
  bridge,
  createRuntime
}: {
  bridge: RuntimeBridge;
  createRuntime: () => ActivityRuntimeAdapter;
}): null {
  useEffect(() => {
    const runtime = createRuntime();
    bridge.attach(runtime);

    return () => {
      bridge.detach();
    };
  }, [bridge, createRuntime]);

  return null;
}
