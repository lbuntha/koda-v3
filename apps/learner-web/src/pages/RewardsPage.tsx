import { Card, PageContainer, RewardBadge } from "@koda/learning-ui";

import { placeholderLearner } from "../data/placeholderData";

export function RewardsPage(): JSX.Element {
  return (
    <PageContainer>
      <div className="space-y-5">
        <Card>
          <h2 className="text-xl font-bold">Rewards</h2>
          <p className="mt-2 text-sm leading-6 text-brand-800">
            Basic reward UI is ready for coins, stars, and streaks.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <RewardBadge label="Coins" value={`${placeholderLearner.coins}`} tone="coin" />
            <RewardBadge label="Stars" value={`${placeholderLearner.stars}`} tone="star" />
            <RewardBadge label="Streak" value={`${placeholderLearner.streakDays} days`} tone="streak" />
          </div>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="text-lg font-bold">First step badge</h3>
            <p className="mt-2 text-sm text-brand-800">Earned after the first lesson session.</p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold">Daily learner badge</h3>
            <p className="mt-2 text-sm text-brand-800">Earned by meeting a daily goal.</p>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
