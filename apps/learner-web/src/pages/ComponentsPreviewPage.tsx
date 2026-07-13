import {
  ActivityToolbar,
  Button,
  Card,
  FeedbackPanel,
  IconButton,
  MascotPanel,
  PageContainer,
  ProgressBar,
  RewardBadge,
  StatChip
} from "@koda/learning-ui";

export function ComponentsPreviewPage(): JSX.Element {
  return (
    <PageContainer>
      <div className="space-y-5">
        <Card>
          <h2 className="text-xl font-bold">Components preview</h2>
          <p className="mt-2 text-sm text-brand-800">
            Storybook is not part of the approved architecture, so Phase 2 uses this development route.
          </p>
        </Card>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="space-y-3">
            <h3 className="text-lg font-bold">Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="quiet">Quiet</Button>
              <IconButton label="Audio" icon="A" />
            </div>
          </Card>
          <Card className="space-y-3">
            <h3 className="text-lg font-bold">Stats</h3>
            <ProgressBar value={68} label="Progress" />
            <div className="grid grid-cols-2 gap-2">
              <StatChip label="Attempts" value="12" />
              <StatChip label="Correct" value="9" tone="success" />
            </div>
          </Card>
          <MascotPanel
            emotion="celebrating"
            title="Mascot panel"
            message="Use this panel for learner guidance and encouragement."
          />
          <FeedbackPanel
            tone="incorrect"
            title="Try again"
            message="Feedback panels support correct, incorrect, and neutral states."
          />
          <Card className="space-y-3 lg:col-span-2">
            <h3 className="text-lg font-bold">Activity toolbar</h3>
            <ActivityToolbar
              actions={[
                { label: "Audio", icon: "A" },
                { label: "Hint", icon: "?" },
                { label: "Retry", icon: "R" }
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <RewardBadge label="Coins" value="120" tone="coin" />
              <RewardBadge label="Stars" value="18" tone="star" />
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
