import { auth } from "@clerk/nextjs/server";
import { Members } from "@/lib/airtable";
import { MemberCard } from "@/components/members/MemberCard";
import { isAdminRole } from "@/lib/utils";
import { meta } from "@/lib/session";

export default async function DirectoryPage() {
  const { sessionClaims } = await auth();
  const { role } = meta(sessionClaims);
  const canSeeContact = isAdminRole(role);

  const members = await Members.getAll({
    filterByFormula: "{status}='Active'",
    sort: [{ field: "last_name", direction: "asc" }],
  });

  return (
    <div style={{ maxWidth: "900px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "8px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.02em", margin: 0 }}>
          Member Directory
        </h1>
        <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
          {members.length} active {members.length === 1 ? "member" : "members"}
        </span>
      </div>

      {members.length === 0
        ? <p style={{ color: "var(--color-text-muted)" }}>No active members found.</p>
        : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px" }}>
            {members.map((m) => (
              <MemberCard key={m.id} member={m} showContact={canSeeContact} />
            ))}
          </div>
        )}
    </div>
  );
}
