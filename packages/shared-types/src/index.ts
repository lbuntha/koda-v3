export type ISODateString = string;

export interface HealthStatus {
  status: "ok";
  service: string;
  version: string;
}

export interface LearnerSummary {
  id: string;
  displayName: string;
}
