import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { ActivityCommand, ActivityEvent } from "./Activity.events";
import { ActivityRegistry } from "./ActivityRegistry";
import { ActivityRenderer } from "./ActivityRenderer";
import { ActivitySessionController } from "./ActivitySession";
import { ActivityStateMachine } from "./ActivityStateMachine";
import type {
  ActivityDefinition,
  ActivityResult,
  ActivityRuntimeAdapter,
  ActivitySession
} from "./Activity.types";
import { RuntimeBridge } from "./runtime/RuntimeBridge";
import { createInitialActivityState } from "./state/activityActions";
import { createActivityStore } from "./state/createActivityStore";
import { selectActivityStatus, selectIsActivityComplete } from "./state/activitySelectors";
import { validateActivityDefinition } from "./validation/validateActivityDefinition";
import { validateActivityResult } from "./validation/validateActivityResult";

const definition: ActivityDefinition = {
  id: "activity-001",
  type: "sample-activity",
  title: "Sample learning activity",
  instruction: {
    text: "Complete the sample learning activity."
  }
};

function createSession(): ActivitySession {
  return createInitialActivityState({
    sessionId: "session-001",
    learnerId: "learner-001",
    lessonId: "lesson-001",
    definition
  });
}

function createResult(response = { selected: true }): ActivityResult {
  return {
    activityId: definition.id,
    activityType: definition.type,
    isCorrect: true,
    response,
    durationMs: 1200
  };
}

describe("ActivityRegistry and ActivityRenderer", () => {
  it("registers and renders by activity type", () => {
    const registry = new ActivityRegistry();
    const session = createSession();

    registry.register({
      type: definition.type,
      render: ({ definition: renderedDefinition }) => (
        <div>{renderedDefinition.title}</div>
      )
    });

    render(
      <ActivityRenderer
        definition={definition}
        session={session}
        registry={registry}
        sendEvent={vi.fn()}
        sendCommand={vi.fn()}
      />
    );

    expect(screen.getByText("Sample learning activity")).toBeInTheDocument();
  });

  it("prevents duplicate renderer registration", () => {
    const registry = new ActivityRegistry();
    const registration = {
      type: definition.type,
      render: () => null
    };

    registry.register(registration);

    expect(() => registry.register(registration)).toThrow(
      "Activity renderer already registered"
    );
  });
});

describe("Activity lifecycle", () => {
  it("moves through ready, active, submitted, and completed states", () => {
    const stateMachine = new ActivityStateMachine();
    const ready = stateMachine.transition(createSession(), { type: "ACTIVITY_READY" });
    const active = stateMachine.transition(ready, {
      type: "ACTIVITY_STARTED",
      startedAt: 100
    });
    const submitted = stateMachine.transition(active, {
      type: "ACTIVITY_SUBMITTED",
      response: { selected: true }
    });
    const completed = stateMachine.transition(submitted, {
      type: "ACTIVITY_COMPLETED",
      result: createResult()
    });

    expect(selectActivityStatus(ready)).toBe("ready");
    expect(selectActivityStatus(active)).toBe("active");
    expect(selectActivityStatus(submitted)).toBe("submitted");
    expect(selectIsActivityComplete(completed)).toBe(true);
  });

  it("notifies session subscribers after lifecycle events", () => {
    const controller = new ActivitySessionController(createSession());
    const listener = vi.fn<(session: ActivitySession) => void>();

    controller.subscribe(listener);
    controller.dispatch({ type: "ACTIVITY_READY" });

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ status: "ready" })
    );
  });

  it("supports a small activity store for state transitions", () => {
    const store = createActivityStore(createSession());
    const event: ActivityEvent = {
      type: "RESPONSE_CHANGED",
      response: { count: 1 }
    };

    store.dispatch({ type: "ACTIVITY_READY" });
    const next = store.dispatch(event);

    expect(next.status).toBe("ready");
    expect(next.response).toEqual({ count: 1 });
  });
});

describe("RuntimeBridge", () => {
  it("starts and stops the attached activity runtime", () => {
    const runtime: ActivityRuntimeAdapter = {
      start: vi.fn(),
      stop: vi.fn(),
      sendCommand: vi.fn()
    };
    const bridge = new RuntimeBridge();

    bridge.attach(runtime);
    bridge.detach();

    expect(runtime.start).toHaveBeenCalledTimes(1);
    expect(runtime.stop).toHaveBeenCalledTimes(1);
  });

  it("forwards commands to the attached activity runtime", () => {
    const commands: ActivityCommand[] = [];
    const runtime: ActivityRuntimeAdapter = {
      start: vi.fn(),
      stop: vi.fn(),
      sendCommand: (command) => {
        commands.push(command);
      }
    };
    const bridge = new RuntimeBridge();

    bridge.attach(runtime);
    bridge.sendCommand({ type: "SHOW_HINT" });

    expect(commands).toEqual([{ type: "SHOW_HINT" }]);
  });
});

describe("activity validation", () => {
  it("validates generic activity definitions", () => {
    expect(validateActivityDefinition(definition)).toEqual({
      valid: true,
      errors: []
    });

    expect(validateActivityDefinition({ type: "sample-activity" }).valid).toBe(false);
  });

  it("validates generic activity results", () => {
    expect(validateActivityResult(createResult())).toEqual({
      valid: true,
      errors: []
    });

    expect(validateActivityResult({ activityId: definition.id }).valid).toBe(false);
  });
});
