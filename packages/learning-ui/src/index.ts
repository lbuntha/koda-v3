export interface KodaButtonProps {
  label: string;
  variant?: "primary" | "secondary";
}

export function getKodaButtonClassName(variant: KodaButtonProps["variant"] = "primary"): string {
  if (variant === "secondary") {
    return "rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-brand-900";
  }

  return "rounded-lg bg-brand-500 px-4 py-2 text-brand-50";
}
