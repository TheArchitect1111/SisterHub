import { auth } from "@clerk/nextjs/server";
import { Events, Announcements, Dues } from "@/lib/airtable";
import { EventCard } from "@/components/events/EventCard";
import { AnnouncementCard } from "@/components/announcements/AnnouncementCard";
import { DuesStatusBadge } from "@/components/dues/DuesStatusBadge";
import { formatCurrency } from "@/lib/utils";
import { meta } from "@/lib/session";

export default async function DashboardPage() {
  const { sessionClaims } = await auth();
  const { airtableId } = meta(sessionClaims);

  const [upcomingEvents, pinnedAnnouncements, myDues] = await Promise.all([
    Events.getAll({
      filterByFormula: "{status}='Upcoming'",
      sort: [{ field: "date", direction: "asc" }],
      maxRecords: 4,
    }),
    Announcements.getAll({
      filterByFormula: "{pinned}=1",
      sort: [{ field: "published_at", direction: "desc" }],
      maxRecords: 2,
    }),
    airtableId ? Dues.forMember(airtableId) : Promise.resolve([]),
  ]);

  const unpaidDues = myDues.filter((d) => d.fields.status === "Unpaid" || d.fields.status === "Partial");
  const totalOwed = unpaidDues.reduce((s, d) => s + (d.fields.amount ?? 0), 0);

  return (
    <div style={{ maxWidth: "900px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "28px", letterSpacing: "-0.02em" }}>
        Dashboard
      </h1>

      {/* Dues widget */}
      {myDues.length > 0 && (
        <div style={{ background: unpaidDues.length ? "rgba(224,82,82,0.08)" : "rgba(76,175,130,0.08)", border: `1px solid ${unpaidDues.length ? "rgba(224,82,82,0.25)" : "rgba(76,175,130,0.25)"}`, borderRadius: "var(--radius-lg)", padding: "18px 22px", marginBottom: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "4px" }}>Dues Status</div>
            {unpaidDues.length
              ? <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-danger)" }}>{formatCurrency(totalOwed)} outstanding</span>
              : <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-success)" }}>All dues paid</span>}
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {myDues.slice(0, 3).map((d) => (
              <div key={d.id} style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                {d.fields.period}: <DuesStatusBadge status={d.fields.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "14px" }}>
            Pinned
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {pinnedAnnouncements.map((a) => <AnnouncementCard key={a.id} announcement={a} />)}
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <h2 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", margin: 0 }}>
            Upcoming Events
          </h2>
          <a href="/portal/events" style={{ fontSize: "0.8rem", color: "var(--color-accent)", textDecoration: "none" }}>View all →</a>
        </div>
        {upcomingEvents.length === 0
          ? <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>No upcoming events.</p>
          : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "14px" }}>
              {upcomingEvents.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          )}
      </section>
    </div>
  );
}
