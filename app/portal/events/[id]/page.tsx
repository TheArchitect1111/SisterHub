import { auth } from "@clerk/nextjs/server";
import { Events, Members } from "@/lib/airtable";
import { RSVPButton } from "@/components/events/RSVPButton";
import { formatDate } from "@/lib/utils";
import { meta } from "@/lib/session";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { sessionClaims } = await auth();
  const { airtableId } = meta(sessionClaims);

  let event;
  try {
    event = await Events.getById(id);
  } catch {
    notFound();
  }

  const f = event.fields;
  const rsvpIds: string[] = f.rsvp_members ?? [];
  const initialRsvped = airtableId ? rsvpIds.includes(airtableId) : false;

  return (
    <div style={{ maxWidth: "640px" }}>
      <a href="/portal/events" style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "20px" }}>
        ← Back to Events
      </a>

      {f.type && (
        <span style={{ display: "inline-block", padding: "2px 12px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(123,45,139,0.2)", color: "var(--color-accent)", marginBottom: "12px" }}>
          {f.type}
        </span>
      )}
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "20px", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
        {f.title}
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
        {f.date && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
            <Calendar size={15} /> {formatDate(f.date)}
          </div>
        )}
        {f.time && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
            <Clock size={15} /> {f.time}
          </div>
        )}
        {f.location && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
            <MapPin size={15} /> {f.location}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
          <Users size={15} /> {rsvpIds.length} {rsvpIds.length === 1 ? "person" : "people"} going
        </div>
      </div>

      <div style={{ marginBottom: "28px" }}>
        <RSVPButton eventId={id} initialRsvped={initialRsvped} />
      </div>

      {f.description && (
        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "22px", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
          {f.description}
        </div>
      )}
    </div>
  );
}
