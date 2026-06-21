import type { TenantConfig } from '@ea/portal-chassis/tenant';

/** SisterHub tenant bindings — Clerk auth when member portal ships. */
export const SISTERHUB_TENANT: TenantConfig = {
  id: 'sister-hub',
  brand: {
    name: 'Sister',
    nameLine2: 'Hub',
    logo: '/sisterhub-logo.svg',
    colors: {
      primary: '#CFB53B',
      accent: '#E84393',
      background: '#FFFFFF',
      text: '#111827',
    },
    fromEmail: 'SisterHub <noreply@sisterhub.app>',
    supportEmail: 'support@sisterhub.app',
  },
  layout: {
    publicNav: ['/', '/blueprint'],
    portalNav: [
      { label: 'Dashboard', href: '/portal' },
      { label: 'Members', href: '/portal/members', comingSoon: true },
      { label: 'Scholarships', href: '/portal/scholarships', comingSoon: true },
    ],
    adminNav: [{ label: 'Chapter Admin', href: '/admin', comingSoon: true }],
  },
  modules: ['members', 'scholarships', 'service-log', 'documents'],
  airtable: {
    baseId: process.env.AIRTABLE_BASE_ID ?? '',
    tables: {
      chapters: 'Chapters',
      members: 'Members',
      scholarships: 'Scholarships',
    },
  },
  urls: {
    canonical: 'https://sisterhub.app',
  },
  auth: {
    provider: 'clerk',
  },
};
