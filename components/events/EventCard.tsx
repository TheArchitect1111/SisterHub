import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { AtRecord, EventFields } from "@/lib/airtable";

interface EventCardProps {
  event: AtRecord<EventFields>;
  showRsvp?: boolean;
}

const typeColors: Record<string, string> = {
  Meeting:           "rgba(123,45,139,0.25)",
  Social:            "rgba(212,160,224,0.2)",
  "Community Service": "rgba(76,175,130,0.2)",
  Fundraiser:        "rgba(232,168,56,0.2)",
};

export function EventCard({ event }: EventCardProps) {
  const f = event.fields;
  return (
    <Link href={`/portal/events/${event.id}`} style={{ textDecoration: "none" }}>
      <div style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "20px",
        transition: "border-color 0.15s",
        cursor: "pointer",
      }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
      >
        {f.type && (
          <span style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: "100px",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            background: typeColors[f.type] ?? "rgba(255,255,255,0.07)",
            color: "var(--color-accent)",
            marginBottom: "10px",
          }}>
            {f.type}
          </span>
        )}
        <h3 style={{ margin: "0 0 12px", fontSize: "0.95rem", fontWeight: 600, color: "var(--color-text)", lineHeight: 1.4 }}>
          {f.title}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {f.date && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
              <Calendar size={13} />
              {formatDate(f.date)}
            </div>
          )}
          {f.time && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
              <Clock size={13} />
              {f.time}
            </div>
          )}
          {f.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
              <MapPin size={13} />
              {f.location}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
