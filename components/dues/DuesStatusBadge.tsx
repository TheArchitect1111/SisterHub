type DuesStatus = "Paid" | "Unpaid" | "Partial" | "Waived";

const styles: Record<DuesStatus, { bg: string; color: string }> = {
  Paid:    { bg: "rgba(76,175,130,0.15)",  color: "var(--color-success)" },
  Unpaid:  { bg: "rgba(224,82,82,0.15)",   color: "var(--color-danger)"  },
  Partial: { bg: "rgba(232,168,56,0.15)",  color: "var(--color-warning)" },
  Waived:  { bg: "rgba(154,143,176,0.15)", color: "var(--color-text-muted)" },
};

export function DuesStatusBadge({ status }: { status?: string | null }) {
  const s = (status as DuesStatus) ?? "Unpaid";
  const style = styles[s] ?? styles.Unpaid;
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: "100px",
      fontSize: "0.72rem",
      fontWeight: 700,
      letterSpacing: "0.04em",
      background: style.bg,
      color: style.color,
    }}>
      {s}
    </span>
  );
}
