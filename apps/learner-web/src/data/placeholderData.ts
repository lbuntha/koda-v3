export const placeholderLearner = {
  name: "Soriya",
  streakDays: 4,
  coins: 120,
  stars: 18,
  dailyGoalProgress: 60
};

export const placeholderLesson = {
  id: "counting-jar",
  title: "Put apples in the jar",
  instruction: "Put five apples into the jar.",
  progress: 35,
  reward: {
    coins: 10,
    stars: 3
  }
};

export const placeholderProgress = [
  { label: "Today", value: 60 },
  { label: "This week", value: 72 },
  { label: "Rewards", value: 45 }
];

export const placeholderActivityCards = [
  {
    title: "Counting practice",
    description: "Continue your lesson session with a visual learning activity.",
    href: "/lesson/counting-jar"
  },
  {
    title: "Daily goal",
    description: "Finish one more learning activity to complete today.",
    href: "/progress"
  }
];
