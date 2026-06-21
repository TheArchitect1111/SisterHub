"use client";

import { PortalLayout, type NavItem } from "@ea/portal-chassis/portal-layout";
import {
  LayoutDashboard,
  Calendar,
  Megaphone,
  CreditCard,
  Users,
  User,
  ShieldCheck,
} from "lucide-react";
import { SISTERHUB_TENANT } from "./sisterhub-portal";

const memberNav: NavItem[] = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/events", label: "Events", icon: Calendar },
  { href: "/portal/announcements", label: "Announcements", icon: Megaphone },
  { href: "/portal/dues", label: "Dues", icon: CreditCard },
  { href: "/portal/directory", label: "Directory", icon: Users },
  { href: "/portal/profile", label: "My Profile", icon: User },
];

const adminNav: NavItem[] = [
  { href: "/portal/admin", label: "Admin Overview", icon: ShieldCheck },
  { href: "/portal/admin/members", label: "Members", icon: Users },
  { href: "/portal/admin/events/new", label: "New Event", icon: Calendar },
  { href: "/portal/admin/announcements/new", label: "New Post", icon: Megaphone },
  { href: "/portal/admin/dues", label: "Dues Ledger", icon: CreditCard },
];

export function SisterHubPortalLayout({ children }: { children: React.ReactNode }) {
  const brand = SISTERHUB_TENANT.brand;

  return (
    <PortalLayout
      portalName={`${brand.name}${brand.nameLine2 ?? ""}`}
      logoSrc="/sisterhub-mark.svg"
      brandColor={brand.colors.primary}
      accentColor={brand.colors.accent ?? "#E84393"}
      navItems={memberNav}
      adminNavItems={adminNav}
      mobileNavStyle="bottom"
    >
      {children}
    </PortalLayout>
  );
}
