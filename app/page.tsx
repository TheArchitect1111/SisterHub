import Link from 'next/link'

const GOLD = '#C9B37E'
const PRIMARY = '#1F3A5F'
const TEXT_PRIMARY = '#2B2B2B'
const TEXT_MUTED = '#6B7280'
const BORDER = '#E5E7EB'
const BG = '#FAF8F5'
const CARD = '#FFFFFF'

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
    <main style={{ minHeight: '100vh', backgroundColor: BG, color: TEXT_PRIMARY, fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: `1px solid ${BORDER}`, position: 'sticky', top: 0, backgroundColor: CARD, zIndex: 10 }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: TEXT_PRIMARY, letterSpacing: '-0.02em' }}>
          Sister<span style={{ color: GOLD }}>Hub</span>
        </div>
        <Link
          href="/blueprint"
          style={{ backgroundColor: PRIMARY, color: '#FFFFFF', padding: '10px 26px', borderRadius: '6px', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}
        >
          Get Started
        </Link>
      </nav>

      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '96px 48px 72px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#F7F1E1', border: `1px solid ${BORDER}`, borderRadius: '100px', padding: '5px 16px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: PRIMARY, marginBottom: '28px' }}>
          Built for NPHC Sororities
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: TEXT_PRIMARY, marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
          Structure that lets<br />
          <span style={{ color: GOLD }}>sisterhood thrive.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: TEXT_MUTED, maxWidth: '540px', margin: '0 auto 44px' }}>
          SisterHub gives sorority chapters the systems, tools, and clarity to run with confidence and lead at every level.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/blueprint"
            style={{ backgroundColor: PRIMARY, color: '#FFFFFF', padding: '15px 38px', borderRadius: '6px', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 700, display: 'inline-block' }}
          >
            Request Your Chapter Blueprint
          </Link>
          <a
            href="#features"
            style={{ backgroundColor: 'transparent', color: TEXT_MUTED, padding: '15px 30px', borderRadius: '6px', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500, border: `1px solid ${BORDER}`, display: 'inline-block' }}
          >
            See the Platform
          </a>
        </div>
      </section>

      <section style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '24px 48px', display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', backgroundColor: CARD }}>
        {[['Alpha Kappa Alpha', 'AKA'], ['Delta Sigma Theta', 'DST'], ['Zeta Phi Beta', 'ZPB'], ['Sigma Gamma Rho', 'SGR']].map(([full, abbr]) => (
          <div key={abbr} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: GOLD, letterSpacing: '0.04em' }}>{abbr}</div>
            <div style={{ fontSize: '0.72rem', color: TEXT_MUTED, marginTop: '3px' }}>{full}</div>
          </div>
        ))}
      </section>

      <section id="features" style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: TEXT_PRIMARY, marginBottom: '14px', letterSpacing: '-0.02em' }}>
            Everything your chapter needs
          </h2>
          <div style={{ width: '36px', height: '3px', backgroundColor: GOLD, borderRadius: '2px', margin: '0 auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '26px 22px' }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: GOLD, marginBottom: '14px' }} />
              <h3 style={{ color: TEXT_PRIMARY, fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ color: TEXT_MUTED, fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '80px 48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: TEXT_PRIMARY, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Ready to build your chapter portal?
        </h2>
        <p style={{ color: TEXT_MUTED, fontSize: '1rem', maxWidth: '460px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Complete the chapter blueprint form and our team will configure your portal within 3 to 5 business days.
        </p>
        <Link
          href="/blueprint"
          style={{ backgroundColor: PRIMARY, color: '#FFFFFF', padding: '15px 42px', borderRadius: '6px', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 700, display: 'inline-block' }}
        >
          Start Your Blueprint
        </Link>
      </section>

      <footer style={{ padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: TEXT_PRIMARY }}>
          Sister<span style={{ color: GOLD }}>Hub</span>
        </div>
        <p style={{ color: TEXT_MUTED, fontSize: '0.78rem', margin: 0 }}>
          Built for NPHC sorority chapters. Powered by structure.
        </p>
      </footer>
    </main>
  )
}
