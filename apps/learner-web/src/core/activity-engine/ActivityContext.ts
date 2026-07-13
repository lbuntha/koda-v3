import { createContext } from "react";

import type { ActivityCommand, ActivityEvent } from "./Activity.events";
import type { ActivityRegistry } from "./ActivityRegistry";
import type { ActivitySession } from "./Activity.types";
import type { RuntimeBridge } from "./runtime/RuntimeBridge";

export interface ActivityContextValue {
  session: ActivitySession;
  registry: ActivityRegistry;
  bridge: RuntimeBridge;
  sendEvent: (event: ActivityEvent) => void;
  sendCommand: (command: ActivityCommand) => void;
}

export const ActivityContext = createContext<ActivityContextValue | null>(null);
