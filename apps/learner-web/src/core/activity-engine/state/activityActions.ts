import type { ActivityResponse, ActivityResult, ActivitySession } from "../Activity.types";

export type ActivityAction =
  | { type: "READY" }
  | { type: "START"; startedAt: number }
  | { type: "UPDATE_RESPONSE"; response: ActivityResponse }
  | { type: "SUBMIT"; response: ActivityResponse }
  | { type: "COMPLETE"; result: ActivityResult; completedAt: number }
  | { type: "RESET" }
  | { type: "ERROR"; message: string };

export function createInitialActivityState(
  session: Omit<
    ActivitySession,
    "status" | "startedAt" | "completedAt" | "response" | "result" | "error"
  >
): ActivitySession {
  return {
    ...session,
    status: "idle",
    startedAt: null,
    completedAt: null,
    response: null,
    result: null,
    error: null
  };
}

export function readyActivity(): ActivityAction {
  return { type: "READY" };
}

export function startActivity(startedAt: number): ActivityAction {
  return { type: "START", startedAt };
}

export function updateActivityResponse(response: ActivityResponse): ActivityAction {
  return { type: "UPDATE_RESPONSE", response };
}

export function submitActivity(response: ActivityResponse): ActivityAction {
  return { type: "SUBMIT", response };
}

export function completeActivity(result: ActivityResult, completedAt: number): ActivityAction {
  return { type: "COMPLETE", result, completedAt };
}

export function resetActivity(): ActivityAction {
  return { type: "RESET" };
}

export function setActivityError(message: string): ActivityAction {
  return { type: "ERROR", message };
}
