import { Card, MascotPanel, PageContainer, StatChip } from "@koda/learning-ui";

import { placeholderLearner } from "../data/placeholderData";

export function ProfilePage(): JSX.Element {
  return (
    <PageContainer>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <MascotPanel
          emotion="thinking"
          title={placeholderLearner.name}
          message="Learner profile details are local placeholders until persistence is implemented."
        />
        <Card>
          <h2 className="text-xl font-bold">Profile</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <StatChip label="Daily goal" value="15 min" tone="brand" />
            <StatChip label="Progress" value="On track" tone="success" />
            <StatChip label="Rewards" value={`${placeholderLearner.coins} coins`} tone="reward" />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
