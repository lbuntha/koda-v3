import { createBrowserRouter } from "react-router-dom";

import { LearnerLayout } from "../layouts/LearnerLayout";
import { ComponentsPreviewPage } from "../../pages/ComponentsPreviewPage";
import { HomePage } from "../../pages/HomePage";
import { LessonCompletePage } from "../../pages/LessonCompletePage";
import { LessonPage } from "../../pages/LessonPage";
import { ProfilePage } from "../../pages/ProfilePage";
import { ProgressPage } from "../../pages/ProgressPage";
import { RewardsPage } from "../../pages/RewardsPage";
import { WelcomePage } from "../../pages/WelcomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LearnerLayout />,
    children: [
      {
        index: true,
        element: <WelcomePage />
      },
      {
        path: "welcome",
        element: <WelcomePage />
      },
      {
        path: "home",
        element: <HomePage />
      },
      {
        path: "lesson/:lessonId",
        element: <LessonPage />
      },
      {
        path: "lesson/:lessonId/complete",
        element: <LessonCompletePage />
      },
      {
        path: "progress",
        element: <ProgressPage />
      },
      {
        path: "rewards",
        element: <RewardsPage />
      },
      {
        path: "profile",
        element: <ProfilePage />
      },
      {
        path: "components-preview",
        element: <ComponentsPreviewPage />
      }
    ]
  }
]);
