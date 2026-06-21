"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Calendar, Megaphone, CreditCard, Users, User, ShieldCheck, Menu, X } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { isAdminRole } from "@/lib/utils";

interface MobileNavProps {
  userFirstName: string;
  role: string;
}

const memberNav = [
  { href: "/portal",               label: "Home",    icon: LayoutDashboard },
  { href: "/portal/events",        label: "Events",  icon: Calendar },
  { href: "/portal/announcements", label: "Posts",   icon: Megaphone },
  { href: "/portal/dues",          label: "Dues",    icon: CreditCard },
  { href: "/portal/directory",     label: "Members", icon: Users },
];

export function MobileNav({ userFirstName, role }: MobileNavProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/portal" ? pathname === "/portal" : pathname.startsWith(href);

  return (
    <>
      <style>{`
        .mobile-header {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 40;
        }
        .mobile-brand {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text);
        }
        .mobile-brand span { color: var(--color-accent); }
        .mobile-menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-muted);
          padding: 4px;
          display: flex;
        }
        .mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.65);
          z-index: 50;
        }
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 260px;
          background: var(--color-surface);
          z-index: 51;
          display: flex;
          flex-direction: column;
          padding: 24px 8px 16px;
          gap: 2px;
          overflow-y: auto;
        }
        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px 16px;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 8px;
        }
        .mobile-drawer-close {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-muted);
          padding: 4px;
          display: flex;
        }
        .mnav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          text-decoration: none;
          font-size: 0.9rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }
        .mnav-link.active { color: var(--color-accent); background: rgba(123,45,139,0.15); font-weight: 600; }
        .mnav-section { padding: 12px 12px 4px; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-muted); }
        .mnav-signout {
          margin-top: auto;
          padding: 10px 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-muted);
          font-size: 0.875rem;
          text-align: left;
          border-top: 1px solid var(--color-border);
          width: 100%;
          padding-top: 16px;
          margin-top: 8px;
        }
        @media (max-width: 768px) {
          .mobile-header { display: flex; }
        }
        @media (min-width: 769px) {
          .mobile-drawer-overlay, .mobile-drawer { display: none !important; }
        }
      `}</style>

      <header className="mobile-header">
        <span className="mobile-brand">Sister<span>Hub</span></span>
        <button className="mobile-menu-btn" onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
      </header>

      {open && (
        <>
          <div className="mobile-drawer-overlay" onClick={() => setOpen(false)} />
          <div className="mobile-drawer">
            <div className="mobile-drawer-header">
              <span className="mobile-brand">Sister<span>Hub</span></span>
              <button className="mobile-drawer-close" onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {memberNav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`mnav-link${isActive(href) ? " active" : ""}`}
                onClick={() => setOpen(false)}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
            <Link href="/portal/profile" className={`mnav-link${isActive("/portal/profile") ? " active" : ""}`} onClick={() => setOpen(false)}>
              <User size={16} />
              My Profile
            </Link>

            {isAdminRole(role) && (
              <>
                <div className="mnav-section">Admin</div>
                <Link href="/portal/admin" className={`mnav-link${isActive("/portal/admin") ? " active" : ""}`} onClick={() => setOpen(false)}>
                  <ShieldCheck size={16} />
                  Admin Overview
                </Link>
                <Link href="/portal/admin/members" className={`mnav-link${isActive("/portal/admin/members") ? " active" : ""}`} onClick={() => setOpen(false)}>
                  <Users size={16} />
                  Members
                </Link>
                <Link href="/portal/admin/dues" className={`mnav-link${isActive("/portal/admin/dues") ? " active" : ""}`} onClick={() => setOpen(false)}>
                  <CreditCard size={16} />
                  Dues Ledger
                </Link>
              </>
            )}

            <button className="mnav-signout" onClick={() => signOut({ redirectUrl: "/login" })}>
              Sign out
            </button>
          </div>
        </>
      )}
    </>
  );
}
