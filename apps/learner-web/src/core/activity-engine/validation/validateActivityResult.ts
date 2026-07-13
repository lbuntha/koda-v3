import type { ActivityResult } from "../Activity.types";
import type { ValidationResult } from "./validateActivityDefinition";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateActivityResult(value: unknown): ValidationResult {
  const errors: string[] = [];

  if (!isRecord(value)) {
    return { valid: false, errors: ["Activity result must be an object."] };
  }

  if (typeof value.activityId !== "string" || value.activityId.length === 0) {
    errors.push("Activity result requires a non-empty activityId.");
  }

  if (typeof value.activityType !== "string" || value.activityType.length === 0) {
    errors.push("Activity result requires a non-empty activityType.");
  }

  if (typeof value.isCorrect !== "boolean") {
    errors.push("Activity result requires a boolean isCorrect value.");
  }

  if (!isRecord(value.response)) {
    errors.push("Activity result requires a response object.");
  }

  if (typeof value.durationMs !== "number" || value.durationMs < 0) {
    errors.push("Activity result requires a non-negative durationMs value.");
  }

  return { valid: errors.length === 0, errors };
}

export function isActivityResult(value: unknown): value is ActivityResult {
  return validateActivityResult(value).valid;
}
