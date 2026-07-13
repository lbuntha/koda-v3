import type { ActivityEvent } from "../Activity.events";
import { ActivityStateMachine } from "../ActivityStateMachine";
import type { ActivitySession } from "../Activity.types";

export interface ActivityStore {
  getSnapshot: () => ActivitySession;
  dispatch: (event: ActivityEvent) => ActivitySession;
  subscribe: (listener: (state: ActivitySession) => void) => () => void;
}

export function createActivityStore(
  initialState: ActivitySession,
  stateMachine = new ActivityStateMachine()
): ActivityStore {
  let state = initialState;
  const listeners = new Set<(state: ActivitySession) => void>();

  return {
    getSnapshot: () => state,
    dispatch: (event) => {
      state = stateMachine.transition(state, event);
      listeners.forEach((listener) => listener(state));
      return state;
    },
    subscribe: (listener) => {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    }
  };
}
