import type { ActivitySession } from "../Activity.types";

export function selectActivityStatus(state: ActivitySession): ActivitySession["status"] {
  return state.status;
}

export function selectActivityDefinition(state: ActivitySession): ActivitySession["definition"] {
  return state.definition;
}

export function selectActivityResponse(state: ActivitySession): ActivitySession["response"] {
  return state.response;
}

export function selectActivityResult(state: ActivitySession): ActivitySession["result"] {
  return state.result;
}

export function selectActivityError(state: ActivitySession): ActivitySession["error"] {
  return state.error;
}

export function selectIsActivityReady(state: ActivitySession): boolean {
  return state.status === "ready";
}

export function selectIsActivityComplete(state: ActivitySession): boolean {
  return state.status === "completed";
}
