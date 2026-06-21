import { Events } from "@/lib/airtable";
import { EventCard } from "@/components/events/EventCard";

export default async function EventsPage() {
  const events = await Events.getAll({
    sort: [{ field: "date", direction: "asc" }],
  });

  const upcoming = events.filter((e) => e.fields.status === "Upcoming");
  const past = events.filter((e) => e.fields.status === "Completed");
  const cancelled = events.filter((e) => e.fields.status === "Cancelled");

  const section = (title: string, items: typeof events) =>
    items.length > 0 && (
      <section style={{ marginBottom: "36px" }}>
        <h2 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "14px" }}>
          {title}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
          {items.map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      </section>
    );

  return (
    <div style={{ maxWidth: "900px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "28px", letterSpacing: "-0.02em" }}>Events</h1>
      {events.length === 0 && <p style={{ color: "var(--color-text-muted)" }}>No events yet.</p>}
      {section("Upcoming", upcoming)}
      {section("Past", past)}
      {section("Cancelled", cancelled)}
    </div>
  );
}
