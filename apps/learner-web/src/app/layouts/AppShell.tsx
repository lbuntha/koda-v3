import { useEffect, useState } from "react";

import type { HealthStatus } from "@koda/shared-types";
import { checkApiHealth } from "../../services/healthClient";

export function AppShell(): JSX.Element {
  const [health, setHealth] = useState<HealthStatus | null>(null);

  useEffect(() => {
    let isMounted = true;

    void checkApiHealth()
      .then((result) => {
        if (isMounted) {
          setHealth(result);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHealth(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-brand-50 px-4 py-6 text-brand-900 sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col gap-8 rounded-lg bg-brand-50 p-6 shadow-sm sm:p-8">
        <header className="flex flex-col gap-3 border-b border-brand-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
              Koda
            </p>
            <h1 className="mt-2 text-3xl font-bold">Learner foundation</h1>
          </div>
          <ApiHealthBadge health={health} />
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <FoundationCard title="Application shell" description="React Router is ready." />
          <FoundationCard title="Koda theme" description="Named Tailwind tokens are active." />
          <FoundationCard title="API client" description="Health check client is wired." />
        </section>
      </section>
    </main>
  );
}

function ApiHealthBadge({ health }: { health: HealthStatus | null }): JSX.Element {
  const label = health ? `${health.service} ${health.status}` : "API unavailable";
  const className = health
    ? "bg-status-success text-brand-50"
    : "bg-status-danger text-brand-50";

  return (
    <span className={`w-fit rounded-lg px-3 py-2 text-sm font-semibold ${className}`}>
      {label}
    </span>
  );
}

function FoundationCard({
  title,
  description
}: {
  title: string;
  description: string;
}): JSX.Element {
  return (
    <article className="rounded-lg border border-brand-100 bg-brand-50 p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6">{description}</p>
    </article>
  );
}
