import { requireRole } from "@/lib/auth";
import { Members } from "@/lib/airtable";
import { DuesStatusBadge } from "@/components/dues/DuesStatusBadge";
import { displayName, formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function AdminMembersPage() {
  await requireRole("Officer");

  const members = await Members.getAll({
    sort: [{ field: "last_name", direction: "asc" }],
  });

  return (
    <div style={{ maxWidth: "980px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "28px", letterSpacing: "-0.02em" }}>
        Members ({members.length})
      </h1>

      <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              {["Name", "Email", "Role", "Status", "Chapter", "Joined", ""].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: "var(--color-text-muted)", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m) => {
              const f = m.fields;
              return (
                <tr key={m.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--color-text)" }}>{displayName(f)}</td>
                  <td style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>{f.email}</td>
                  <td style={{ padding: "12px 16px", color: "var(--color-accent)", fontWeight: 600, fontSize: "0.8rem" }}>{f.role ?? "Member"}</td>
                  <td style={{ padding: "12px 16px" }}><DuesStatusBadge status={f.status ?? "Active"} /></td>
                  <td style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>{f.chapter ?? "—"}</td>
                  <td style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>{formatDate(f.joined_date)}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <Link href={`/portal/admin/members/${m.id}`} style={{ fontSize: "0.8rem", color: "var(--color-accent)", textDecoration: "none", fontWeight: 600 }}>Edit</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
