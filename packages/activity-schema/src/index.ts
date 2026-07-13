export type ActivityType = "drag-to-container";

export interface ActivityInstruction {
  text: string;
  audioKey?: string;
}

export interface ActivityDefinition {
  id: string;
  type: ActivityType;
  title: string;
  instruction: ActivityInstruction;
}
