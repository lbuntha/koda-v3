import { createBrowserRouter } from "react-router-dom";

import { AppShell } from "../layouts/AppShell";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />
  }
]);
