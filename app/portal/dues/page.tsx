import { auth } from "@clerk/nextjs/server";
import { Dues } from "@/lib/airtable";
import { DuesStatusBadge } from "@/components/dues/DuesStatusBadge";
import { formatDate, formatCurrency } from "@/lib/utils";
import { meta } from "@/lib/session";

export default async function DuesPage() {
  const { sessionClaims } = await auth();
  const { airtableId } = meta(sessionClaims);

  const dues = airtableId ? await Dues.forMember(airtableId) : [];

  const total = dues.reduce((s, d) => s + (d.fields.amount ?? 0), 0);
  const paid = dues.filter((d) => d.fields.status === "Paid").reduce((s, d) => s + (d.fields.amount ?? 0), 0);
  const owed = total - paid;

  return (
    <div style={{ maxWidth: "700px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "28px", letterSpacing: "-0.02em" }}>My Dues</h1>

      {dues.length === 0
        ? <p style={{ color: "var(--color-text-muted)" }}>No dues records on file.</p>
        : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
              {[
                { label: "Total Billed", value: formatCurrency(total), color: "var(--color-text)" },
                { label: "Paid", value: formatCurrency(paid), color: "var(--color-success)" },
                { label: "Outstanding", value: formatCurrency(owed), color: owed > 0 ? "var(--color-danger)" : "var(--color-success)" },
              ].map((stat) => (
                <div key={stat.label} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "18px" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "6px" }}>{stat.label}</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 700, color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    {["Period", "Amount", "Status", "Paid Date", "Method"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: "var(--color-text-muted)", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dues.map((d) => {
                    const f = d.fields;
                    return (
                      <tr key={d.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                        <td style={{ padding: "13px 16px", color: "var(--color-text)", fontWeight: 500 }}>{f.period ?? "—"}</td>
                        <td style={{ padding: "13px 16px", color: "var(--color-text)" }}>{formatCurrency(f.amount)}</td>
                        <td style={{ padding: "13px 16px" }}><DuesStatusBadge status={f.status} /></td>
                        <td style={{ padding: "13px 16px", color: "var(--color-text-muted)" }}>{formatDate(f.paid_date)}</td>
                        <td style={{ padding: "13px 16px", color: "var(--color-text-muted)" }}>{f.payment_method ?? "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
    </div>
  );
}
