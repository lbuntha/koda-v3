import type { ActivityResponse, ActivityResult } from "./Activity.types";

export type ActivityEvent =
  | { type: "ACTIVITY_READY" }
  | { type: "ACTIVITY_STARTED"; startedAt: number }
  | { type: "RESPONSE_CHANGED"; response: ActivityResponse }
  | { type: "ACTIVITY_SUBMITTED"; response: ActivityResponse }
  | { type: "ACTIVITY_COMPLETED"; result: ActivityResult }
  | { type: "ACTIVITY_RESET" }
  | { type: "ACTIVITY_ERROR"; message: string };

export type ActivityCommand =
  | { type: "START_ACTIVITY" }
  | { type: "RESET_ACTIVITY" }
  | { type: "SUBMIT_ACTIVITY" }
  | { type: "SHOW_HINT" }
  | { type: "PLAY_CORRECT_FEEDBACK" }
  | { type: "PLAY_INCORRECT_FEEDBACK" }
  | { type: "SET_REDUCED_MOTION"; enabled: boolean };
