import type { ActivityDefinition, ActivityType } from "@koda/activity-schema";

export interface ActivityRendererRegistration {
  type: ActivityType;
  canRender: (definition: ActivityDefinition) => boolean;
}

export class ActivityRegistry {
  private readonly registrations = new Map<ActivityType, ActivityRendererRegistration>();

  register(registration: ActivityRendererRegistration): void {
    this.registrations.set(registration.type, registration);
  }

  get(type: ActivityType): ActivityRendererRegistration | undefined {
    return this.registrations.get(type);
  }
}
