import {
  Button,
  Card,
  MascotPanel,
  PageContainer,
  ProgressBar,
  RewardBadge
} from "@koda/learning-ui";

export function WelcomePage(): JSX.Element {
  return (
    <PageContainer className="flex items-center">
      <div className="mx-auto grid w-full max-w-5xl gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col justify-center gap-5">
          <MascotPanel
            emotion="encouraging"
            title="Welcome to Koda"
            message="Start a calm, colorful learner journey with responsive Koda application UI."
            action={
              <a href="/home">
                <Button>Start learning</Button>
              </a>
            }
          />
          <Card>
            <h2 className="text-xl font-bold">Today&apos;s path</h2>
            <p className="mt-2 text-sm leading-6 text-brand-800">
              Open a lesson session, complete feedback, and collect a reward.
            </p>
            <div className="mt-4">
              <ProgressBar value={40} label="Getting started" />
            </div>
          </Card>
        </div>
        <Card className="flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Learner preview</h2>
            <p className="mt-2 text-sm leading-6 text-brand-800">
              Placeholder data is used for Phase 2. Persistence and activity runtime remain out of scope.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <RewardBadge label="Stars" value="18" tone="star" />
            <RewardBadge label="Coins" value="120" tone="coin" />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
