import type { ActivityEvent } from "./Activity.events";
import type { ActivitySession } from "./Activity.types";
import { activityReducer } from "./state/activityReducer";

export class ActivityStateMachine {
  transition(state: ActivitySession, event: ActivityEvent): ActivitySession {
    switch (event.type) {
      case "ACTIVITY_READY":
        return activityReducer(state, { type: "READY" });
      case "ACTIVITY_STARTED":
        return activityReducer(state, { type: "START", startedAt: event.startedAt });
      case "RESPONSE_CHANGED":
        return activityReducer(state, { type: "UPDATE_RESPONSE", response: event.response });
      case "ACTIVITY_SUBMITTED":
        return activityReducer(state, { type: "SUBMIT", response: event.response });
      case "ACTIVITY_COMPLETED":
        return activityReducer(state, {
          type: "COMPLETE",
          result: event.result,
          completedAt: Date.now()
        });
      case "ACTIVITY_RESET":
        return activityReducer(state, { type: "RESET" });
      case "ACTIVITY_ERROR":
        return activityReducer(state, { type: "ERROR", message: event.message });
    }
  }
}
