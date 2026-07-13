import { useParams } from "react-router-dom";

import {
  Button,
  Card,
  FeedbackPanel,
  PageContainer,
  RewardBadge
} from "@koda/learning-ui";

import { placeholderLesson } from "../data/placeholderData";

export function LessonCompletePage(): JSX.Element {
  const { lessonId } = useParams();

  return (
    <PageContainer className="flex items-center">
      <div className="mx-auto w-full max-w-3xl space-y-5">
        <FeedbackPanel
          tone="correct"
          title="Lesson complete"
          message="The learner completed the placeholder lesson session. Attempts and progress persistence will come later."
        />
        <Card>
          <h2 className="text-xl font-bold">{placeholderLesson.title}</h2>
          <p className="mt-2 text-sm text-brand-800">Lesson ID: {lessonId}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <RewardBadge label="Coins" value={`+${placeholderLesson.reward.coins}`} tone="coin" />
            <RewardBadge label="Stars" value={`+${placeholderLesson.reward.stars}`} tone="star" />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="/home">
              <Button>Back home</Button>
            </a>
            <a href="/rewards">
              <Button variant="secondary">View rewards</Button>
            </a>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
