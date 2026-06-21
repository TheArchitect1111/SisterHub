import { requireRole } from "@/lib/auth";
import { EventEditor } from "@/components/admin/EventEditor";

export default async function NewEventPage() {
  await requireRole("Officer");
  return (
    <div style={{ maxWidth: "660px" }}>
      <a href="/portal/events" style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}>← Back to Events</a>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "28px", letterSpacing: "-0.02em" }}>Create Event</h1>
      <EventEditor mode="create" />
    </div>
  );
}
