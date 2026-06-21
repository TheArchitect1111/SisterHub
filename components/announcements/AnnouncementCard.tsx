import { Pin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { AtRecord, AnnouncementFields } from "@/lib/airtable";

interface AnnouncementCardProps {
  announcement: AtRecord<AnnouncementFields>;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const f = announcement.fields;
  return (
    <div style={{
      background: "var(--color-surface)",
      border: `1px solid ${f.pinned ? "var(--color-brand)" : "var(--color-border)"}`,
      borderRadius: "var(--radius-lg)",
      padding: "20px 22px",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "10px" }}>
        <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "var(--color-text)", lineHeight: 1.4 }}>
          {f.title}
        </h3>
        {f.pinned && <Pin size={14} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }} />}
      </div>
      <p style={{ margin: "0 0 12px", fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
        {f.body}
      </p>
      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
        {f.author && <span style={{ marginRight: "12px" }}>{f.author}</span>}
        {formatDate(f.published_at)}
      </div>
    </div>
  );
}
