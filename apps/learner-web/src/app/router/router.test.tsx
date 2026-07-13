import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ComponentsPreviewPage } from "../../pages/ComponentsPreviewPage";
import { HomePage } from "../../pages/HomePage";
import { LearnerLayout } from "../layouts/LearnerLayout";

function renderRoute(path: string, element: JSX.Element): void {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <LearnerLayout />,
        children: [{ path, element }]
      }
    ],
    { initialEntries: [`/${path}`] }
  );

  render(<RouterProvider router={router} />);
}

describe("learner routes", () => {
  it("renders the home route with shared Koda UI", () => {
    renderRoute("home", <HomePage />);

    expect(screen.getByRole("heading", { name: "Ready for today?" })).toBeInTheDocument();
    expect(screen.getByText("Continue lesson")).toBeInTheDocument();
  });

  it("renders the components preview route instead of Storybook", () => {
    renderRoute("components-preview", <ComponentsPreviewPage />);

    expect(screen.getByRole("heading", { name: "Components preview" })).toBeInTheDocument();
    expect(screen.getByText("Activity toolbar")).toBeInTheDocument();
  });
});
