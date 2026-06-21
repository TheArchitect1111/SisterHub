import { DuesStatusBadge } from "@/components/dues/DuesStatusBadge";
import { formatDate, formatCurrency } from "@/lib/utils";
import type { AtRecord, DuesFields } from "@/lib/airtable";

interface DuesLedgerProps {
  dues: AtRecord<DuesFields>[];
}

export function DuesLedger({ dues }: DuesLedgerProps) {
  if (!dues.length) {
    return <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>No dues records found.</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
            {["Member ID", "Period", "Amount", "Status", "Paid Date", "Method"].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "var(--color-text-muted)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dues.map((d) => {
            const f = d.fields;
            return (
              <tr key={d.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "12px 12px", color: "var(--color-text-muted)", fontSize: "0.78rem" }}>
                  {f.member?.[0]?.slice(0, 8) ?? "—"}
                </td>
                <td style={{ padding: "12px 12px", color: "var(--color-text)" }}>{f.period ?? "—"}</td>
                <td style={{ padding: "12px 12px", color: "var(--color-text)" }}>{formatCurrency(f.amount)}</td>
                <td style={{ padding: "12px 12px" }}><DuesStatusBadge status={f.status} /></td>
                <td style={{ padding: "12px 12px", color: "var(--color-text-muted)" }}>{formatDate(f.paid_date)}</td>
                <td style={{ padding: "12px 12px", color: "var(--color-text-muted)" }}>{f.payment_method ?? "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
