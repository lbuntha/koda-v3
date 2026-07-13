import {
  Button,
  Card,
  MascotPanel,
  PageContainer,
  ProgressBar,
  StatChip
} from "@koda/learning-ui";

import {
  placeholderActivityCards,
  placeholderLearner
} from "../data/placeholderData";

export function HomePage(): JSX.Element {
  return (
    <PageContainer>
      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="space-y-5">
          <MascotPanel
            emotion="idle"
            title="Ready for today?"
            message="Continue your lesson session and keep your daily goal moving."
            action={
              <a href="/lesson/counting-jar">
                <Button>Continue lesson</Button>
              </a>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {placeholderActivityCards.map((item) => (
              <Card key={item.title}>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-brand-800">{item.description}</p>
                <a className="mt-4 inline-block" href={item.href}>
                  <Button variant="secondary">Open</Button>
                </a>
              </Card>
            ))}
          </div>
        </section>
        <aside className="space-y-4">
          <Card>
            <h2 className="text-lg font-bold">Daily goal</h2>
            <div className="mt-4">
              <ProgressBar value={placeholderLearner.dailyGoalProgress} label="Progress" />
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <StatChip label="Streak" value={`${placeholderLearner.streakDays} days`} tone="danger" />
            <StatChip label="Stars" value={`${placeholderLearner.stars}`} tone="reward" />
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
