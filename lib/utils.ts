export function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatCurrency(amount?: number | null): string {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function displayName(fields: { first_name?: string; last_name?: string }): string {
  return [fields.first_name, fields.last_name].filter(Boolean).join(" ") || "—";
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function isAdminRole(role?: string | null): boolean {
  return role === "Officer" || role === "Admin";
}
