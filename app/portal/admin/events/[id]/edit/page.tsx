import { requireRole } from "@/lib/auth";
import { Events } from "@/lib/airtable";
import { EventEditor } from "@/components/admin/EventEditor";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole("Officer");
  const { id } = await params;

  let event;
  try {
    event = await Events.getById(id);
  } catch {
    notFound();
  }

  return (
    <div style={{ maxWidth: "660px" }}>
      <a href="/portal/events" style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}>← Back to Events</a>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "28px", letterSpacing: "-0.02em" }}>Edit Event</h1>
      <EventEditor event={event} mode="edit" />
    </div>
  );
}
