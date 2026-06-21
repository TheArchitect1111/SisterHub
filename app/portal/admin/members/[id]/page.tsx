import { requireRole } from "@/lib/auth";
import { Members } from "@/lib/airtable";
import { MemberEditor } from "@/components/admin/MemberEditor";
import { displayName } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole("Admin");
  const { id } = await params;

  let member;
  try {
    member = await Members.getById(id);
  } catch {
    notFound();
  }

  return (
    <div style={{ maxWidth: "660px" }}>
      <a href="/portal/admin/members" style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}>← Back to Members</a>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "28px", letterSpacing: "-0.02em" }}>
        Edit — {displayName(member.fields)}
      </h1>
      <MemberEditor member={member} />
    </div>
  );
}
