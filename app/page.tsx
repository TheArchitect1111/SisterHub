import Link from 'next/link'

const PLUM_BG = '#1C0A2E'
const PLUM_SURFACE = '#2A1247'
const PLUM_BORDER = '#3D1A60'
const GOLD = '#CFB53B'
const ROSE = '#E84393'
const TEXT_PRIMARY = '#FAF6F1'
const TEXT_MUTED = '#C4B0D8'

const FEATURES = [
  {
    title: 'Member Portal',
    description: 'A central home for every member: dues, documents, announcements, and events in one place.',
  },
  {
    title: 'Leadership Tools',
    description: 'Meeting minutes, committee hubs, and task management built for chapter officers.',
  },
  {
    title: 'Scholarship Tracking',
    description: 'Manage applications, recipients, and reporting for every scholarship your chapter awards.',
  },
  {
    title: 'Community Service Log',
    description: 'Track volunteer hours, partner organizations, and service goals across the semester.',
  },
  {
    title: 'AI Knowledge Assistant',
    description: 'Instant answers about chapter history, bylaws, and processes for members at every level.',
  },
  {
    title: 'Analytics Dashboard',
    description: 'See engagement, retention, academics, and finances in a single chapter health view.',
  },
]

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: PLUM_BG, color: TEXT_PRIMARY, fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderBottom: `1px solid ${PLUM_BORDER}`, position: 'sticky', top: 0, backgroundColor: PLUM_BG, zIndex: 10 }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 600, color: TEXT_PRIMARY, letterSpacing: '-0.02em' }}>
          Sister<span style={{ color: GOLD }}>Hub</span>
        </div>
        <Link
          href="/blueprint"
          style={{ backgroundColor: ROSE, color: TEXT_PRIMARY, padding: '10px 28px', borderRadius: '6px', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.04em' }}
        >
          Get Started
        </Link>
      </nav>

      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '100px 48px 80px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: 'rgba(232,67,147,0.12)', border: `1px solid rgba(232,67,147,0.3)`, borderRadius: '100px', padding: '6px 18px', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: ROSE, marginBottom: '32px' }}>
          Built for NPHC Sororities
        </div>
        <h1 style={{ fontSize: '3.75rem', fontWeight: 300, color: TEXT_PRIMARY, marginBottom: '28px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          Structure that lets<br />
          <span style={{ color: GOLD }}>sisterhood thrive.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: TEXT_MUTED, maxWidth: '560px', margin: '0 auto 48px', fontWeight: 300 }}>
          SisterHub gives sorority chapters the systems, tools, and clarity to run with confidence and lead at every level.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/blueprint"
            style={{ backgroundColor: ROSE, color: TEXT_PRIMARY, padding: '16px 40px', borderRadius: '6px', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600, display: 'inline-block' }}
          >
            Request Your Chapter Blueprint
          </Link>
          <a
            href="#features"
            style={{ backgroundColor: 'transparent', color: TEXT_MUTED, padding: '16px 32px', borderRadius: '6px', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500, border: `1px solid ${PLUM_BORDER}`, display: 'inline-block' }}
          >
            See the Platform
          </a>
        </div>
      </section>

      <section style={{ borderTop: `1px solid ${PLUM_BORDER}`, borderBottom: `1px solid ${PLUM_BORDER}`, padding: '28px 48px', display: 'flex', justifyContent: 'center', gap: '64px', flexWrap: 'wrap' }}>
        {[['Alpha Kappa Alpha', 'AKA'], ['Delta Sigma Theta', 'DST'], ['Zeta Phi Beta', 'ZPB'], ['Sigma Gamma Rho', 'SGR']].map(([full, abbr]) => (
          <div key={abbr} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: GOLD, letterSpacing: '0.05em' }}>{abbr}</div>
            <div style={{ fontSize: '0.75rem', color: TEXT_MUTED, marginTop: '4px' }}>{full}</div>
          </div>
        ))}
      </section>

      <section id="features" style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 300, color: TEXT_PRIMARY, marginBottom: '16px' }}>
            Everything your chapter needs
          </h2>
          <div style={{ width: '40px', height: '3px', backgroundColor: ROSE, borderRadius: '2px', margin: '0 auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{ backgroundColor: PLUM_SURFACE, border: `1px solid ${PLUM_BORDER}`, borderRadius: '10px', padding: '28px 24px' }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: ROSE, marginBottom: '16px' }} />
              <h3 style={{ color: TEXT_PRIMARY, fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ color: TEXT_MUTED, fontSize: '0.875rem', lineHeight: 1.7 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: PLUM_SURFACE, borderTop: `1px solid ${PLUM_BORDER}`, borderBottom: `1px solid ${PLUM_BORDER}`, padding: '80px 48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 300, color: TEXT_PRIMARY, marginBottom: '20px' }}>
          Ready to build your chapter portal?
        </h2>
        <p style={{ color: TEXT_MUTED, fontSize: '1rem', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          Complete the chapter blueprint form and our team will configure your portal within 3 to 5 business days.
        </p>
        <Link
          href="/blueprint"
          style={{ backgroundColor: ROSE, color: TEXT_PRIMARY, padding: '16px 44px', borderRadius: '6px', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600, display: 'inline-block' }}
        >
          Start Your Blueprint
        </Link>
      </section>

      <footer style={{ padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: TEXT_MUTED }}>
          Sister<span style={{ color: GOLD }}>Hub</span>
        </div>
        <p style={{ color: TEXT_MUTED, fontSize: '0.8rem' }}>
          Built for NPHC sorority chapters. Powered by structure.
        </p>
      </footer>
    </main>
  )
}
