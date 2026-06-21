import { displayName } from "@/lib/utils";
import type { AtRecord, MemberFields } from "@/lib/airtable";

interface MemberCardProps {
  member: AtRecord<MemberFields>;
  showContact?: boolean;
}

const roleColor: Record<string, string> = {
  Admin:   "var(--color-brand)",
  Officer: "var(--color-accent)",
  Member:  "var(--color-text-muted)",
};

export function MemberCard({ member, showContact }: MemberCardProps) {
  const f = member.fields;
  const initials = [f.first_name?.[0], f.last_name?.[0]].filter(Boolean).join("").toUpperCase();

  return (
    <div style={{
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-lg)",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      textAlign: "center",
    }}>
      <div style={{
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        background: f.avatar_url ? "transparent" : "var(--color-brand)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.1rem",
        fontWeight: 700,
        color: "#fff",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {f.avatar_url ? <img src={f.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-text)" }}>
          {displayName(f)}
        </div>
        {f.role && (
          <div style={{ fontSize: "0.75rem", color: roleColor[f.role] ?? "var(--color-text-muted)", fontWeight: 600, marginTop: "3px" }}>
            {f.role}
          </div>
        )}
        {f.chapter && (
          <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
            {f.chapter}
          </div>
        )}
      </div>
      {showContact && f.email && (
        <a href={`mailto:${f.email}`} style={{ fontSize: "0.75rem", color: "var(--color-accent)", textDecoration: "none" }}>
          {f.email}
        </a>
      )}
    </div>
  );
}
