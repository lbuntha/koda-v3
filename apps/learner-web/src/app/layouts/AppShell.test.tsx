import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders the learner foundation shell", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              status: "ok",
              service: "koda-api",
              version: "0.1.0"
            })
        })
      )
    );

    render(<AppShell />);

    expect(screen.getByRole("heading", { name: "Learner foundation" })).toBeInTheDocument();
    expect(screen.getByText("React Router is ready.")).toBeInTheDocument();
    expect(await screen.findByText("koda-api ok")).toBeInTheDocument();
  });
});
