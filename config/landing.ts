import type { LandingPageConfig } from '@/lib/landing-chassis/types';

export const landingConfig: LandingPageConfig = {
  brand: {
    nameLine1: 'SISTER',
    nameLine2: 'HUB',
    tagline: 'STRUCTURE THAT LETS SISTERHOOD THRIVE.',
    logo: '/sisterhub-mark.svg',
  },
  colors: {
    primary: '#7B2D8B',
    primaryBright: '#9B3DAB',
    black: '#0F0F12',
    dark: '#1A1A22',
    offWhite: '#FAFAFA',
    white: '#FFFFFF',
  },
  links: {
    apply: '/blueprint',
    video: '/blueprint',
    schedule: '/blueprint',
    instagram: 'https://instagram.com',
  },
  nav: [
    { label: 'HOME', href: '#top' },
    { label: 'TESTIMONIALS', href: '#testimonials' },
    { label: 'PORTAL', href: '#portal' },
    { label: 'APPLY', href: '#apply' },
    { label: 'CONTACT', href: '#contact' },
  ],
  possibility: {
    headline: 'What becomes possible when your chapter runs with clarity?',
    subheadline: 'SisterHub gives NPHC sorority chapters one place for members, officers, and tradition.',
    supporting:
      'Dues, events, announcements, scholarships, and leadership tools — built for how your chapter actually works.',
    image: '/sisterhub-mark.svg',
    applyLabel: 'REQUEST YOUR BLUEPRINT',
    videoLabel: 'SEE THE PLATFORM',
  },
  socialProof: {
    heading: 'CHAPTERS TRUST STRUCTURE',
    items: [
      {
        quote: 'Our officers finally had one place for dues, events, and announcements — not five group chats.',
        name: 'Chapter President',
        role: 'Officer Testimonial',
        photo: '/sisterhub-mark.svg',
      },
      {
        quote: 'New members knew where to find everything from day one. Onboarding felt professional, not chaotic.',
        name: 'Membership Chair',
        role: 'Leadership Testimonial',
        photo: '/sisterhub-mark.svg',
      },
      {
        quote: 'Parents and alumnae could see the chapter was organized and serious about excellence.',
        name: 'Advisor',
        role: 'Advisor Testimonial',
        photo: '/sisterhub-mark.svg',
      },
    ],
  },
  philosophy: {
    label: 'OUR BELIEF',
    quote: 'Structure is not the opposite of sisterhood — it is what protects it.',
    attribution: '— SisterHub',
    points: [
      'Honor chapter tradition while modernizing operations.',
      'Give every member clarity, not confusion.',
      'Equip officers with tools that match their responsibility.',
    ],
  },
  challenge: {
    heading: 'THE CHALLENGE',
    intro: 'Most chapters have passion. Few have systems that scale with growth.',
    painPoints: [
      'Dues and records scattered across spreadsheets',
      'Officers repeating the same questions every semester',
      'Events and announcements lost in group chats',
      'Scholarship and service tracking done at the last minute',
      'No single member home for chapter life',
    ],
  },
  difference: {
    heading: 'THE SISTERHUB DIFFERENCE',
    subheading: 'One platform for members, officers, and chapter health.',
    cards: [
      { title: 'Member Portal', description: 'Dashboard, profile, directory, and chapter updates in one place.' },
      { title: 'Officer Tools', description: 'Admin views for members, events, dues, and announcements.' },
      { title: 'Scholarship & Service', description: 'Track applications, hours, and chapter impact over time.' },
      { title: 'Chapter Blueprint', description: 'We configure your portal to match your bylaws and workflow.' },
    ],
  },
  process: {
    heading: 'HOW IT WORKS',
    subheading: 'From blueprint to live portal in days, not months.',
    steps: [
      { label: '1. BLUEPRINT', description: 'Tell us about your chapter structure and priorities.', icon: 'apply' },
      { label: '2. CONFIGURE', description: 'We set up modules, branding, and officer roles.', icon: 'upload' },
      { label: '3. LAUNCH', description: 'Members receive access to their chapter portal.', icon: 'agreement' },
      { label: '4. ENGAGE', description: 'Officers publish events, dues, and announcements.', icon: 'recruiting' },
      { label: '5. GROW', description: 'Track engagement and chapter health over time.', icon: 'opportunities' },
    ],
  },
  portal: {
    heading: 'MEMBER PORTAL',
    subheading: 'Premium experience for members and officers — mobile-first, always current.',
    features: [
      { title: 'Member Dashboard', description: 'Events, dues, and pinned announcements at a glance.', icon: 'manage' },
      { title: 'Officer Admin', description: 'Role-based tools for chapter leadership.', icon: 'send' },
      { title: 'Directory & Profile', description: 'Member roster and personal chapter profile.', icon: 'school' },
      { title: 'Real-Time Updates', description: 'Announcements and event changes in one feed.', icon: 'updates' },
      { title: 'Dues Tracking', description: 'Status visible to members and treasurers.', icon: 'trackicon' },
      { title: 'Secure Access', description: 'Clerk-powered sign-in with chapter role metadata.', icon: 'lock' },
    ],
    dashboardImage: '/sisterhub-mark.svg',
  },
  results: {
    heading: 'BUILT FOR NPHC EXCELLENCE',
    subheading: 'Designed for sorority chapters that lead with purpose.',
    stats: [
      { value: '4', label: 'NPHC ORGANIZATIONS' },
      { value: '1', label: 'CHAPTER HOME' },
      { value: '6+', label: 'CORE MODULES' },
      { value: '3–5', label: 'DAYS TO LAUNCH' },
    ],
    proofs: [
      { image: '/sisterhub-mark.svg', caption: 'Member dashboard — events and dues at a glance.' },
      { image: '/sisterhub-mark.svg', caption: 'Officer admin — members, events, and announcements.' },
      { image: '/sisterhub-mark.svg', caption: 'Chapter blueprint — configured to your bylaws.' },
    ],
    profileCta: 'REQUEST YOUR BLUEPRINT',
    profileHref: '/blueprint',
  },
  founder: {
    heading: 'BUILT FOR CHAPTERS',
    role: 'SisterHub by Efficiency Architects',
    story:
      'SisterHub applies the same portal chassis that powers EA client experiences — tuned for sorority chapter operations, officer workflows, and member engagement.',
    image: '/sisterhub-mark.svg',
  },
  finalCta: {
    heading: 'READY TO BUILD YOUR CHAPTER PORTAL?',
    subheading: 'Complete the blueprint form and we will configure your portal within 3 to 5 business days.',
    applyLabel: 'START YOUR BLUEPRINT',
    scheduleLabel: 'CONTACT US',
  },
  footer: {
    about: 'SisterHub gives NPHC sorority chapters the systems, tools, and clarity to run with confidence.',
    quickLinks: [
      { label: 'Blueprint', href: '/blueprint' },
      { label: 'Member Login', href: '/login' },
      { label: 'Portal', href: '/portal' },
    ],
    resources: [
      { label: 'Member Portal', href: '/portal' },
      { label: 'Chapter Blueprint', href: '/blueprint' },
    ],
    email: 'support@sisterhub.app',
    instagramLabel: '@sisterhub',
    location: 'North America',
    copyright: '© 2026 SisterHub. All Rights Reserved.',
  },
};
