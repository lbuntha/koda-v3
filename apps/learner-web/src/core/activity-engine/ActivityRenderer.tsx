import type { ReactNode } from "react";

import type { ActivityCommand, ActivityEvent } from "./Activity.events";
import type { ActivityRegistry } from "./ActivityRegistry";
import type { ActivityDefinition, ActivitySession } from "./Activity.types";

export function ActivityRenderer({
  definition,
  session,
  registry,
  sendEvent,
  sendCommand,
  fallback = null
}: {
  definition: ActivityDefinition;
  session: ActivitySession;
  registry: ActivityRegistry;
  sendEvent: (event: ActivityEvent) => void;
  sendCommand: (command: ActivityCommand) => void;
  fallback?: ReactNode;
}): JSX.Element {
  const registration = registry.get(definition.type);

  if (!registration) {
    return <>{fallback}</>;
  }

  return (
    <>
      {registration.render({
        definition,
        session,
        sendEvent,
        sendCommand
      })}
    </>
  );
}
