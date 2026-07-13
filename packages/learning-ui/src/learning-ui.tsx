import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode
} from "react";

export type ButtonVariant = "primary" | "secondary" | "quiet";
export type StatChipTone = "brand" | "reward" | "success" | "danger";
export type FeedbackTone = "correct" | "incorrect" | "neutral";
export type RewardBadgeTone = "coin" | "star" | "streak";

export interface BottomNavigationItem {
  label: string;
  href: string;
  icon: ReactNode;
  active?: boolean;
}

export interface ActivityToolbarAction {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function AppShell({
  children,
  navigationItems,
  header,
  className
}: {
  children: ReactNode;
  navigationItems: BottomNavigationItem[];
  header?: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div className={cx("min-h-screen bg-brand-50 text-brand-900", className)}>
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        {header}
        <div className="flex flex-1 flex-col pb-24 md:pb-6">{children}</div>
        <BottomNavigation items={navigationItems} />
      </div>
    </div>
  );
}

export function PageContainer({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <main className={cx("w-full flex-1 px-4 py-5 sm:px-6 lg:px-8", className)}>
      {children}
    </main>
  );
}

export function Header({
  eyebrow = "Koda",
  title,
  subtitle,
  action
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}): JSX.Element {
  return (
    <header className="px-4 pt-5 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-lg border border-brand-100 bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-500">
            {eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-800">
              {subtitle}
            </p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </header>
  );
}

export function BottomNavigation({
  items
}: {
  items: BottomNavigationItem[];
}): JSX.Element {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-brand-100 bg-brand-50 px-2 py-2 md:sticky md:mx-4 md:mb-4 md:rounded-lg md:border">
      <div className="mx-auto grid max-w-3xl grid-cols-5 gap-1">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cx(
              "flex min-h-14 flex-col items-center justify-center rounded-lg px-2 py-1 text-xs font-semibold",
              item.active
                ? "bg-brand-500 text-brand-50"
                : "text-brand-700 hover:bg-brand-100"
            )}
          >
            <span className="text-lg leading-none" aria-hidden="true">
              {item.icon}
            </span>
            <span className="mt-1 truncate">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}): JSX.Element {
  const variantClassName: Record<ButtonVariant, string> = {
    primary: "bg-brand-500 text-brand-50 hover:bg-brand-600",
    secondary:
      "border border-brand-200 bg-brand-50 text-brand-900 hover:bg-brand-100",
    quiet: "bg-brand-100 text-brand-900 hover:bg-brand-200"
  };

  return (
    <button
      type={type}
      className={cx(
        "inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
        variantClassName[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function IconButton({
  label,
  icon,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon: ReactNode;
}): JSX.Element {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cx(
        "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-brand-200 bg-brand-50 text-lg font-bold text-brand-900 hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}

export function Card({
  children,
  className
}: HTMLAttributes<HTMLElement>): JSX.Element {
  return (
    <section
      className={cx("rounded-lg border border-brand-100 bg-brand-50 p-4", className)}
    >
      {children}
    </section>
  );
}

export function ProgressBar({
  value,
  label
}: {
  value: number;
  label?: string;
}): JSX.Element {
  const normalizedValue = Math.max(0, Math.min(100, value));

  return (
    <div>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-sm font-semibold">
          <span>{label}</span>
          <span>{normalizedValue}%</span>
        </div>
      ) : null}
      <div className="h-3 overflow-hidden rounded-lg bg-brand-100">
        <div
          className="h-full rounded-lg bg-brand-500"
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
}

export function StatChip({
  label,
  value,
  tone = "brand"
}: {
  label: string;
  value: string;
  tone?: StatChipTone;
}): JSX.Element {
  const toneClassName: Record<StatChipTone, string> = {
    brand: "border-brand-200 bg-brand-50 text-brand-900",
    reward: "border-reward-amber bg-brand-50 text-brand-900",
    success: "border-status-success bg-brand-50 text-status-success",
    danger: "border-status-danger bg-brand-50 text-status-danger"
  };

  return (
    <div
      className={cx(
        "rounded-lg border px-3 py-2 text-sm font-bold",
        toneClassName[tone]
      )}
    >
      <span className="block text-xs font-semibold text-brand-700">{label}</span>
      <span>{value}</span>
    </div>
  );
}

export function MascotPanel({
  emotion,
  title,
  message,
  action
}: {
  emotion: "idle" | "thinking" | "celebrating" | "encouraging";
  title: string;
  message: string;
  action?: ReactNode;
}): JSX.Element {
  const symbol: Record<typeof emotion, string> = {
    idle: "K",
    thinking: "?",
    celebrating: "*",
    encouraging: "+"
  };

  return (
    <Card className="flex items-center gap-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-2xl font-black text-brand-50">
        {symbol[emotion]}
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-brand-800">{message}</p>
        {action ? <div className="mt-3">{action}</div> : null}
      </div>
    </Card>
  );
}

export function FeedbackPanel({
  tone,
  title,
  message,
  action
}: {
  tone: FeedbackTone;
  title: string;
  message: string;
  action?: ReactNode;
}): JSX.Element {
  const toneClassName: Record<FeedbackTone, string> = {
    correct: "border-status-success text-status-success",
    incorrect: "border-status-danger text-status-danger",
    neutral: "border-brand-200 text-brand-900"
  };

  return (
    <Card className={cx("border-2", toneClassName[tone])}>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-brand-800">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </Card>
  );
}

export function RewardBadge({
  label,
  value,
  tone
}: {
  label: string;
  value: string;
  tone: RewardBadgeTone;
}): JSX.Element {
  const icon: Record<RewardBadgeTone, string> = {
    coin: "C",
    star: "*",
    streak: "^"
  };

  return (
    <div className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-reward-amber bg-brand-50 px-3 py-2 text-sm font-bold text-brand-900">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-reward-amber text-brand-900">
        {icon[tone]}
      </span>
      <span>
        <span className="block text-xs font-semibold text-brand-700">{label}</span>
        {value}
      </span>
    </div>
  );
}

export function LessonHeader({
  title,
  progress,
  onBack,
  rightSlot
}: {
  title: string;
  progress: number;
  onBack?: () => void;
  rightSlot?: ReactNode;
}): JSX.Element {
  return (
    <div className="border-b border-brand-100 bg-brand-50 px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <IconButton label="Back" icon="<" onClick={onBack} />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold">{title}</h1>
          <ProgressBar value={progress} />
        </div>
        {rightSlot}
      </div>
    </div>
  );
}

export function LessonShell({
  header,
  stage,
  toolbar,
  feedback,
  actionBar
}: {
  header: ReactNode;
  stage: ReactNode;
  toolbar?: ReactNode;
  feedback?: ReactNode;
  actionBar?: ReactNode;
}): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-brand-50 text-brand-900">
      {header}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-4 py-4 sm:px-6">
        <section className="min-h-[360px] rounded-lg border border-brand-100 bg-brand-50 p-4">
          {stage}
        </section>
        {toolbar}
        {feedback}
      </main>
      {actionBar ? (
        <footer className="border-t border-brand-100 bg-brand-50 px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-5xl justify-end gap-3">{actionBar}</div>
        </footer>
      ) : null}
    </div>
  );
}

export function ActivityToolbar({
  actions
}: {
  actions: ActivityToolbarAction[];
}): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-brand-100 bg-brand-50 p-2">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="quiet"
          onClick={action.onClick}
          disabled={action.disabled}
          className="gap-2"
        >
          <span aria-hidden="true">{action.icon}</span>
          <span>{action.label}</span>
        </Button>
      ))}
    </div>
  );
}
