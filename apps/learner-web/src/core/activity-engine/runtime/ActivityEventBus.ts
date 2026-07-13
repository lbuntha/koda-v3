import type { ActivityEvent } from "../Activity.events";

export class ActivityEventBus {
  private readonly listeners = new Set<(event: ActivityEvent) => void>();

  emit(event: ActivityEvent): void {
    this.listeners.forEach((listener) => listener(event));
  }

  subscribe(listener: (event: ActivityEvent) => void): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  clear(): void {
    this.listeners.clear();
  }
}
