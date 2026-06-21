import { requireRole } from "@/lib/auth";
import { AnnouncementEditor } from "@/components/admin/AnnouncementEditor";

export default async function NewAnnouncementPage() {
  await requireRole("Officer");
  return (
    <div style={{ maxWidth: "640px" }}>
      <a href="/portal/announcements" style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}>← Back to Announcements</a>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "28px", letterSpacing: "-0.02em" }}>New Announcement</h1>
      <AnnouncementEditor />
    </div>
  );
}
