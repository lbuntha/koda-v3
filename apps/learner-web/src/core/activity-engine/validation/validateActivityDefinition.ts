import type { ActivityDefinition } from "../Activity.types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateActivityDefinition(value: unknown): ValidationResult {
  const errors: string[] = [];

  if (!isRecord(value)) {
    return { valid: false, errors: ["Activity definition must be an object."] };
  }

  if (typeof value.id !== "string" || value.id.length === 0) {
    errors.push("Activity definition requires a non-empty id.");
  }

  if (typeof value.type !== "string" || value.type.length === 0) {
    errors.push("Activity definition requires a non-empty type.");
  }

  if (typeof value.title !== "string" || value.title.length === 0) {
    errors.push("Activity definition requires a non-empty title.");
  }

  if (!isRecord(value.instruction)) {
    errors.push("Activity definition requires an instruction object.");
  } else {
    if (typeof value.instruction.text !== "string" || value.instruction.text.length === 0) {
      errors.push("Activity instruction requires non-empty text.");
    }

    if (
      value.instruction.audioKey !== undefined &&
      typeof value.instruction.audioKey !== "string"
    ) {
      errors.push("Activity instruction audioKey must be a string when provided.");
    }
  }

  return { valid: errors.length === 0, errors };
}

export function isActivityDefinition(value: unknown): value is ActivityDefinition {
  return validateActivityDefinition(value).valid;
}
