import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from "react";
import type { ReactNode } from "react";

import type { ActivityCommand, ActivityEvent } from "./Activity.events";
import { ActivityContext } from "./ActivityContext";
import type { ActivityRegistry } from "./ActivityRegistry";
import type { ActivitySession } from "./Activity.types";
import { RuntimeBridge } from "./runtime/RuntimeBridge";
import { activityReducer } from "./state/activityReducer";

export function ActivityProvider({
  children,
  initialSession,
  registry,
  bridge
}: {
  children: ReactNode;
  initialSession: ActivitySession;
  registry: ActivityRegistry;
  bridge?: RuntimeBridge;
}): JSX.Element {
  const [session, dispatch] = useReducer(activityReducer, initialSession);
  const runtimeBridge = useMemo(() => bridge ?? new RuntimeBridge(), [bridge]);

  const sendEvent = useCallback((event: ActivityEvent) => {
    switch (event.type) {
      case "ACTIVITY_READY":
        dispatch({ type: "READY" });
        break;
      case "ACTIVITY_STARTED":
        dispatch({ type: "START", startedAt: event.startedAt });
        break;
      case "RESPONSE_CHANGED":
        dispatch({ type: "UPDATE_RESPONSE", response: event.response });
        break;
      case "ACTIVITY_SUBMITTED":
        dispatch({ type: "SUBMIT", response: event.response });
        break;
      case "ACTIVITY_COMPLETED":
        dispatch({
          type: "COMPLETE",
          result: event.result,
          completedAt: Date.now()
        });
        break;
      case "ACTIVITY_RESET":
        dispatch({ type: "RESET" });
        break;
      case "ACTIVITY_ERROR":
        dispatch({ type: "ERROR", message: event.message });
        break;
    }
  }, []);

  const sendCommand = useCallback(
    (command: ActivityCommand) => {
      runtimeBridge.sendCommand(command);
    },
    [runtimeBridge]
  );

  useEffect(() => {
    return runtimeBridge.events.subscribe(sendEvent);
  }, [runtimeBridge, sendEvent]);

  const value = useMemo(
    () => ({
      session,
      registry,
      bridge: runtimeBridge,
      sendEvent,
      sendCommand
    }),
    [runtimeBridge, registry, sendCommand, sendEvent, session]
  );

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
}

export function useActivity(): {
  session: ActivitySession;
  registry: ActivityRegistry;
  bridge: RuntimeBridge;
  sendEvent: (event: ActivityEvent) => void;
  sendCommand: (command: ActivityCommand) => void;
} {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error("useActivity must be used inside ActivityProvider");
  }

  return context;
}
