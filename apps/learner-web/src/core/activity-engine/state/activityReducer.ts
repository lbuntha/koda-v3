import type { ActivitySession } from "../Activity.types";
import type { ActivityAction } from "./activityActions";

export function activityReducer(
  state: ActivitySession,
  action: ActivityAction
): ActivitySession {
  switch (action.type) {
    case "READY":
      return { ...state, status: "ready", error: null };
    case "START":
      return { ...state, status: "active", startedAt: action.startedAt, error: null };
    case "UPDATE_RESPONSE":
      return { ...state, response: action.response };
    case "SUBMIT":
      return { ...state, status: "submitted", response: action.response, error: null };
    case "COMPLETE":
      return {
        ...state,
        status: "completed",
        result: action.result,
        response: action.result.response,
        completedAt: action.completedAt,
        error: null
      };
    case "RESET":
      return {
        ...state,
        status: "ready",
        startedAt: null,
        completedAt: null,
        response: null,
        result: null,
        error: null
      };
    case "ERROR":
      return { ...state, status: "error", error: action.message };
  }
}
