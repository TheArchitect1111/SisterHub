"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import {
  LayoutDashboard, Calendar, Megaphone, CreditCard,
  Users, User, ShieldCheck, LogOut, ChevronRight,
} from "lucide-react";
import { isAdminRole } from "@/lib/utils";

interface SidebarProps {
  userFirstName: string;
  userImageUrl?: string;
  role: string;
}

const memberNav = [
  { href: "/portal",               label: "Dashboard",      icon: LayoutDashboard },
  { href: "/portal/events",        label: "Events",         icon: Calendar },
  { href: "/portal/announcements", label: "Announcements",  icon: Megaphone },
  { href: "/portal/dues",          label: "Dues",           icon: CreditCard },
  { href: "/portal/directory",     label: "Directory",      icon: Users },
  { href: "/portal/profile",       label: "My Profile",     icon: User },
];

const adminNav = [
  { href: "/portal/admin",                    label: "Admin Overview",  icon: ShieldCheck },
  { href: "/portal/admin/members",            label: "Members",         icon: Users },
  { href: "/portal/admin/events/new",         label: "New Event",       icon: Calendar },
  { href: "/portal/admin/announcements/new",  label: "New Post",        icon: Megaphone },
  { href: "/portal/admin/dues",               label: "Dues Ledger",     icon: CreditCard },
];

export function Sidebar({ userFirstName, userImageUrl, role }: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const isActive = (href: string) =>
    href === "/portal" ? pathname === "/portal" : pathname.startsWith(href);

  return (
    <aside className="sidebar">
      <style>{`
        .sidebar {
          width: var(--sidebar-w, 240px);
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          background: var(--color-surface);
          border-right: 1px solid var(--color-border);
          flex-shrink: 0;
          overflow-y: auto;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 24px 20px 20px;
          border-bottom: 1px solid var(--color-border);
        }
        .sidebar-brand-dot {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: var(--color-brand);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sidebar-brand-dot svg { color: #fff; }
        .sidebar-brand-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-text);
          letter-spacing: -0.01em;
        }
        .sidebar-brand-name span { color: var(--color-accent); }
        .sidebar-nav {
          flex: 1;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .nav-section-label {
          padding: 12px 12px 4px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: var(--radius-md);
          text-decoration: none;
          font-size: 0.875rem;
          color: var(--color-text-muted);
          transition: background 0.12s, color 0.12s;
          font-weight: 500;
        }
        .nav-link:hover {
          background: rgba(255,255,255,0.05);
          color: var(--color-text);
        }
        .nav-link.active {
          background: rgba(123, 45, 139, 0.18);
          color: var(--color-accent);
          font-weight: 600;
        }
        .nav-link svg { flex-shrink: 0; }
        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sidebar-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--color-brand);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          overflow: hidden;
        }
        .sidebar-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .sidebar-user-name {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text);
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .signout-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: var(--color-text-muted);
          border-radius: 4px;
          display: flex;
          align-items: center;
        }
        .signout-btn:hover { color: var(--color-danger, #e05252); }
        @media (max-width: 768px) { .sidebar { display: none; } }
      `}</style>

      <div className="sidebar-brand">
        <div className="sidebar-brand-dot">
          <ChevronRight size={14} />
        </div>
        <span className="sidebar-brand-name">
          Sister<span>Hub</span>
        </span>
      </div>

      <nav className="sidebar-nav">
        {memberNav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`nav-link${isActive(href) ? " active" : ""}`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}

        {isAdminRole(role) && (
          <>
            <div className="nav-section-label">Admin</div>
            {adminNav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link${isActive(href) ? " active" : ""}`}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-avatar">
          {userImageUrl
            ? <img src={userImageUrl} alt="" />
            : (userFirstName?.[0] ?? "M").toUpperCase()}
        </div>
        <span className="sidebar-user-name">{userFirstName}</span>
        <button
          className="signout-btn"
          onClick={() => signOut({ redirectUrl: "/login" })}
          title="Sign out"
        >
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}
