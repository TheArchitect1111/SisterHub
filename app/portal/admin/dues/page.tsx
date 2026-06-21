import { requireRole } from "@/lib/auth";
import { Dues } from "@/lib/airtable";
import { DuesLedger } from "@/components/admin/DuesLedger";
import { formatCurrency } from "@/lib/utils";

export default async function AdminDuesPage() {
  await requireRole("Officer");
  const dues = await Dues.getAll({ sort: [{ field: "period", direction: "desc" }] });

  const totals = {
    all:     dues.reduce((s, d) => s + (d.fields.amount ?? 0), 0),
    paid:    dues.filter((d) => d.fields.status === "Paid").reduce((s, d) => s + (d.fields.amount ?? 0), 0),
    unpaid:  dues.filter((d) => d.fields.status === "Unpaid" || d.fields.status === "Partial").reduce((s, d) => s + (d.fields.amount ?? 0), 0),
  };

  return (
    <div style={{ maxWidth: "980px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "28px", letterSpacing: "-0.02em" }}>Dues Ledger</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {[
          { label: "Total Billed", value: formatCurrency(totals.all), color: "var(--color-text)" },
          { label: "Collected", value: formatCurrency(totals.paid), color: "var(--color-success)" },
          { label: "Outstanding", value: formatCurrency(totals.unpaid), color: totals.unpaid > 0 ? "var(--color-danger)" : "var(--color-success)" },
        ].map((s) => (
          <div key={s.label} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "18px 20px" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "6px" }}>{s.label}</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden", padding: "20px" }}>
        <DuesLedger dues={dues} />
      </div>
    </div>
  );
}
