import type {
  ActivityRendererRegistration,
  ActivityType
} from "./Activity.types";

export class ActivityRegistry {
  private readonly registrations = new Map<ActivityType, ActivityRendererRegistration>();

  register(registration: ActivityRendererRegistration): void {
    if (this.registrations.has(registration.type)) {
      throw new Error(`Activity renderer already registered for type: ${registration.type}`);
    }

    this.registrations.set(registration.type, registration);
  }

  unregister(type: ActivityType): void {
    this.registrations.delete(type);
  }

  get(type: ActivityType): ActivityRendererRegistration | undefined {
    return this.registrations.get(type);
  }

  has(type: ActivityType): boolean {
    return this.registrations.has(type);
  }
}
