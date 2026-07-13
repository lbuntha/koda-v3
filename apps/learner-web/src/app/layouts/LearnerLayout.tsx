import { Outlet, useLocation } from "react-router-dom";

import {
  AppShell,
  Header,
  RewardBadge,
  type BottomNavigationItem
} from "@koda/learning-ui";

import { placeholderLearner } from "../../data/placeholderData";

const navigation = [
  { label: "Home", href: "/home", icon: "H" },
  { label: "Progress", href: "/progress", icon: "%" },
  { label: "Rewards", href: "/rewards", icon: "*" },
  { label: "Profile", href: "/profile", icon: "P" },
  { label: "Preview", href: "/components-preview", icon: "U" }
] as const;

export function LearnerLayout(): JSX.Element {
  const location = useLocation();
  const items: BottomNavigationItem[] = navigation.map((item) => ({
    ...item,
    active:
      location.pathname === item.href ||
      (item.href !== "/home" && location.pathname.startsWith(item.href))
  }));

  return (
    <AppShell
      navigationItems={items}
      header={
        <Header
          title={`Hi, ${placeholderLearner.name}`}
          subtitle="Choose a learning activity, check progress, or review rewards."
          action={<RewardBadge label="Coins" value={`${placeholderLearner.coins}`} tone="coin" />}
        />
      }
    >
      <Outlet />
    </AppShell>
  );
}
