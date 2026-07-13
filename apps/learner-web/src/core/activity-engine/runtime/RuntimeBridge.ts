import type { ActivityCommand, ActivityEvent } from "../Activity.events";
import type { ActivityRuntimeAdapter } from "../Activity.types";
import { ActivityCommandBus } from "./ActivityCommandBus";
import { ActivityEventBus } from "./ActivityEventBus";

export class RuntimeBridge {
  readonly events: ActivityEventBus;
  readonly commands: ActivityCommandBus;
  private runtime: ActivityRuntimeAdapter | null = null;
  private unsubscribeCommand: (() => void) | null = null;

  constructor(events = new ActivityEventBus(), commands = new ActivityCommandBus()) {
    this.events = events;
    this.commands = commands;
  }

  attach(runtime: ActivityRuntimeAdapter): void {
    this.detach();
    this.runtime = runtime;
    this.unsubscribeCommand = this.commands.subscribe((command) => {
      runtime.sendCommand(command);
    });
    runtime.start();
  }

  detach(): void {
    if (this.runtime) {
      this.runtime.stop();
    }

    if (this.unsubscribeCommand) {
      this.unsubscribeCommand();
    }

    this.runtime = null;
    this.unsubscribeCommand = null;
  }

  sendCommand(command: ActivityCommand): void {
    this.commands.send(command);
  }

  emitEvent(event: ActivityEvent): void {
    this.events.emit(event);
  }
}
