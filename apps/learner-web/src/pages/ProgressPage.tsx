import { Card, PageContainer, ProgressBar, StatChip } from "@koda/learning-ui";

import { placeholderProgress } from "../data/placeholderData";

export function ProgressPage(): JSX.Element {
  return (
    <PageContainer>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <h2 className="text-xl font-bold">Progress</h2>
          <p className="mt-2 text-sm leading-6 text-brand-800">
            Placeholder progress summarizes the learner journey for Phase 2.
          </p>
          <div className="mt-5 space-y-4">
            {placeholderProgress.map((item) => (
              <ProgressBar key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </Card>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <StatChip label="Lesson sessions" value="8" tone="brand" />
          <StatChip label="Learner attempts" value="24" tone="success" />
          <StatChip label="Daily goal" value="On track" tone="reward" />
        </div>
      </div>
    </PageContainer>
  );
}
