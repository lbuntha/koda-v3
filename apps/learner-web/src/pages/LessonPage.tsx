import { useNavigate, useParams } from "react-router-dom";

import {
  ActivityToolbar,
  Button,
  FeedbackPanel,
  LessonHeader,
  LessonShell,
  RewardBadge
} from "@koda/learning-ui";

import { placeholderLesson } from "../data/placeholderData";

export function LessonPage(): JSX.Element {
  const navigate = useNavigate();
  const { lessonId } = useParams();

  return (
    <LessonShell
      header={
        <LessonHeader
          title={placeholderLesson.title}
          progress={placeholderLesson.progress}
          onBack={() => navigate("/home")}
          rightSlot={<RewardBadge label="Reward" value="+10" tone="coin" />}
        />
      }
      stage={
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-brand-500">
            Lesson session
          </p>
          <h2 className="max-w-xl text-2xl font-bold">{placeholderLesson.instruction}</h2>
          <p className="max-w-xl text-sm leading-6 text-brand-800">
            Activity runtime will be added in a later phase. This area is reserved for the data-driven learning activity stage.
          </p>
          <p className="text-xs font-semibold text-brand-700">Lesson ID: {lessonId}</p>
        </div>
      }
      toolbar={
        <ActivityToolbar
          actions={[
            { label: "Audio", icon: "A" },
            { label: "Hint", icon: "?" },
            { label: "Retry", icon: "R" }
          ]}
        />
      }
      feedback={
        <FeedbackPanel
          tone="neutral"
          title="Feedback appears here"
          message="Correct and incorrect feedback panels are available, but no activity validation runs in Phase 2."
        />
      }
      actionBar={
        <Button onClick={() => navigate(`/lesson/${lessonId ?? placeholderLesson.id}/complete`)}>
          Complete preview
        </Button>
      }
    />
  );
}
