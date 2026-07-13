import type { ReactNode } from "react";

import type { ActivityCommand, ActivityEvent } from "./Activity.events";

export type ActivityType = string;
export type ActivitySessionStatus =
  | "idle"
  | "ready"
  | "active"
  | "submitted"
  | "completed"
  | "error";

export interface ActivityInstruction {
  text: string;
  audioKey?: string;
}

export interface ActivityDefinition {
  id: string;
  type: ActivityType;
  title: string;
  instruction: ActivityInstruction;
  [key: string]: unknown;
}

export interface ActivityResponse {
  [key: string]: unknown;
}

export interface ActivityResult {
  activityId: string;
  activityType: ActivityType;
  isCorrect: boolean;
  response: ActivityResponse;
  durationMs: number;
}

export interface ActivitySession {
  sessionId: string;
  learnerId: string;
  lessonId: string;
  definition: ActivityDefinition;
  status: ActivitySessionStatus;
  startedAt: number | null;
  completedAt: number | null;
  response: ActivityResponse | null;
  result: ActivityResult | null;
  error: string | null;
}

export interface ActivityRendererProps {
  definition: ActivityDefinition;
  session: ActivitySession;
  sendEvent: (event: ActivityEvent) => void;
  sendCommand: (command: ActivityCommand) => void;
}

export interface ActivityRendererRegistration {
  type: ActivityType;
  render: (props: ActivityRendererProps) => ReactNode;
}

export interface ActivityRuntimeAdapter {
  start: () => void;
  stop: () => void;
  sendCommand: (command: ActivityCommand) => void;
}
