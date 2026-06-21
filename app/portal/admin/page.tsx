import { requireRole } from "@/lib/auth";
import { Members, Events, Dues } from "@/lib/airtable";
import Link from "next/link";
import { Users, Calendar, CreditCard, Megaphone } from "lucide-react";

export default async function AdminPage() {
  await requireRole("Officer");

  const [members, events, dues] = await Promise.all([
    Members.getAll({ filterByFormula: "{status}='Active'" }),
    Events.getAll({ filterByFormula: "{status}='Upcoming'", maxRecords: 100 }),
    Dues.getAll({ filterByFormula: "OR({status}='Unpaid',{status}='Partial')", maxRecords: 100 }),
  ]);

  const stats = [
    { label: "Active Members", value: members.length, icon: Users, href: "/portal/admin/members" },
    { label: "Upcoming Events", value: events.length, icon: Calendar, href: "/portal/admin/events/new" },
    { label: "Unpaid Dues", value: dues.length, icon: CreditCard, href: "/portal/admin/dues" },
  ];

  const quickActions = [
    { label: "New Event", href: "/portal/admin/events/new", icon: Calendar },
    { label: "New Announcement", href: "/portal/admin/announcements/new", icon: Megaphone },
    { label: "View Members", href: "/portal/admin/members", icon: Users },
    { label: "Dues Ledger", href: "/portal/admin/dues", icon: CreditCard },
  ];

  return (
    <div style={{ maxWidth: "800px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "28px", letterSpacing: "-0.02em" }}>Admin Overview</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "36px" }}>
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} style={{ textDecoration: "none" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "22px 20px", transition: "border-color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-brand)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            >
              <Icon size={20} style={{ color: "var(--color-brand)", marginBottom: "10px" }} />
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-text)", marginBottom: "4px" }}>{value}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", fontWeight: 500 }}>{label}</div>
            </div>
          </Link>
        ))}
      </div>

      <h2 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "14px" }}>Quick Actions</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px" }}>
        {quickActions.map(({ label, href, icon: Icon }) => (
          <Link key={label} href={href} style={{ textDecoration: "none" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "14px 16px", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.875rem", color: "var(--color-text)", fontWeight: 500, transition: "border-color 0.15s, background 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-brand)"; e.currentTarget.style.background = "rgba(123,45,139,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.background = "var(--color-surface)"; }}
            >
              <Icon size={15} style={{ color: "var(--color-accent)" }} />
              {label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
