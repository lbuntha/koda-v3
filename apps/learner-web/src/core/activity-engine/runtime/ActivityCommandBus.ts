import type { ActivityCommand } from "../Activity.events";

export class ActivityCommandBus {
  private readonly listeners = new Set<(command: ActivityCommand) => void>();

  send(command: ActivityCommand): void {
    this.listeners.forEach((listener) => listener(command));
  }

  subscribe(listener: (command: ActivityCommand) => void): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  clear(): void {
    this.listeners.clear();
  }
}
