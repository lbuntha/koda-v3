import type { ActivityEvent } from "./Activity.events";
import { ActivityStateMachine } from "./ActivityStateMachine";
import type { ActivitySession } from "./Activity.types";

export class ActivitySessionController {
  private session: ActivitySession;
  private readonly stateMachine: ActivityStateMachine;
  private readonly listeners = new Set<(session: ActivitySession) => void>();

  constructor(session: ActivitySession, stateMachine = new ActivityStateMachine()) {
    this.session = session;
    this.stateMachine = stateMachine;
  }

  getSnapshot(): ActivitySession {
    return this.session;
  }

  dispatch(event: ActivityEvent): ActivitySession {
    this.session = this.stateMachine.transition(this.session, event);
    this.listeners.forEach((listener) => listener(this.session));
    return this.session;
  }

  subscribe(listener: (session: ActivitySession) => void): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }
}
