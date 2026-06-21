import { Announcements } from "@/lib/airtable";
import { AnnouncementCard } from "@/components/announcements/AnnouncementCard";

export default async function AnnouncementsPage() {
  const all = await Announcements.getAll({
    sort: [{ field: "published_at", direction: "desc" }],
  });

  const pinned = all.filter((a) => a.fields.pinned);
  const rest = all.filter((a) => !a.fields.pinned);

  return (
    <div style={{ maxWidth: "680px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "28px", letterSpacing: "-0.02em" }}>
        Announcements
      </h1>

      {all.length === 0 && <p style={{ color: "var(--color-text-muted)" }}>No announcements yet.</p>}

      {pinned.length > 0 && (
        <section style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "12px" }}>Pinned</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {pinned.map((a) => <AnnouncementCard key={a.id} announcement={a} />)}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section>
          {pinned.length > 0 && <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "12px" }}>All Posts</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {rest.map((a) => <AnnouncementCard key={a.id} announcement={a} />)}
          </div>
        </section>
      )}
    </div>
  );
}
