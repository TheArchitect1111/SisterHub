'use client'

import { useState } from 'react'

const WEBHOOK = 'https://hook.us2.make.com/a9h57qarhot1mzbg3s6ayy8qvj6yobwf'

const GOLD = '#CFB53B'
const ROSE = '#E84393'
const TEXT_PRIMARY = '#111827'
const TEXT_MUTED = '#6B7280'
const TEXT_LABEL = '#92400E'
const BORDER = '#E5E7EB'
const SURFACE = '#FAFAFA'

const ORGANIZATIONS = [
  { value: '', label: 'Select your organization' },
  { value: 'Alpha Kappa Alpha', label: 'Alpha Kappa Alpha (AKA)' },
  { value: 'Delta Sigma Theta', label: 'Delta Sigma Theta (DST)' },
  { value: 'Zeta Phi Beta', label: 'Zeta Phi Beta (ZPB)' },
  { value: 'Sigma Gamma Rho', label: 'Sigma Gamma Rho (SGR)' },
]

const FIELDS: { key: string; label: string; type?: string; placeholder?: string }[] = [
  { key: 'chapterName', label: 'Chapter Name', placeholder: 'e.g. Alpha Mu Chapter' },
  { key: 'chapterDesignation', label: 'Chapter Designation', placeholder: 'e.g. Alpha Mu' },
  { key: 'universityName', label: 'University or College', placeholder: 'e.g. Howard University' },
  { key: 'city', label: 'City', placeholder: 'e.g. Washington' },
  { key: 'state', label: 'State', placeholder: 'e.g. DC' },
  { key: 'chapterEmail', label: 'Chapter Email', type: 'email', placeholder: 'chapter@university.edu' },
  { key: 'presidentName', label: 'Chapter President Name', placeholder: 'Full name' },
  { key: 'presidentEmail', label: 'President Email', type: 'email', placeholder: 'president@university.edu' },
]

type FormState = {
  nationalOrganization: string
  chapterName: string
  chapterDesignation: string
  universityName: string
  city: string
  state: string
  chapterEmail: string
  presidentName: string
  presidentEmail: string
}

const EMPTY_FORM: FormState = {
  nationalOrganization: '',
  chapterName: '',
  chapterDesignation: '',
  universityName: '',
  city: '',
  state: '',
  chapterEmail: '',
  presidentName: '',
  presidentEmail: '',
}

const FULL_WIDTH_KEYS = new Set(['chapterName', 'universityName', 'chapterEmail', 'presidentName', 'presidentEmail'])

export default function BlueprintPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async () => {
    const webhookUrl = WEBHOOK
    setStatus('submitting')
    setErrorMessage('')
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      setStatus('success')
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    backgroundColor: '#FFFFFF',
    border: `1px solid ${BORDER}`,
    borderRadius: '6px',
    color: TEXT_PRIMARY,
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: TEXT_LABEL,
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '7px',
    fontWeight: 600,
  }

  if (status === 'success') {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: ROSE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', color: '#fff', fontSize: '1.75rem', lineHeight: 1 }}>
            &#10003;
          </div>
          <h2 style={{ color: TEXT_PRIMARY, fontSize: '1.875rem', fontWeight: 600, marginBottom: '14px' }}>Blueprint Received</h2>
          <p style={{ color: TEXT_MUTED, lineHeight: 1.8, marginBottom: '10px' }}>
            Thank you, <span style={{ color: GOLD, fontWeight: 600 }}>{form.chapterName || 'your chapter'}</span>. We will review your information and be in touch within 24 to 48 hours.
          </p>
          <p style={{ color: TEXT_MUTED, fontSize: '0.875rem' }}>
            Confirmation will be sent to <span style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>{form.chapterEmail}</span>.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: `1px solid ${BORDER}` }}>
        <a href="/" style={{ fontSize: '1.4rem', fontWeight: 700, color: TEXT_PRIMARY, textDecoration: 'none', letterSpacing: '-0.02em' }}>
          Sister<span style={{ color: GOLD }}>Hub</span>
        </a>
        <span style={{ color: TEXT_MUTED, fontSize: '0.85rem' }}>Chapter Intake</span>
      </nav>

      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '56px 32px 80px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ color: TEXT_PRIMARY, fontSize: '2rem', fontWeight: 700, marginBottom: '10px', letterSpacing: '-0.02em' }}>
            Chapter Blueprint
          </h1>
          <div style={{ width: '36px', height: '3px', backgroundColor: GOLD, borderRadius: '2px', marginBottom: '14px' }} />
          <p style={{ color: TEXT_MUTED, fontSize: '0.95rem', lineHeight: 1.7 }}>
            Tell us about your chapter. We use this information to configure your SisterHub portal and tailor your onboarding experience.
          </p>
        </div>

        <div style={{ backgroundColor: SURFACE, borderRadius: '12px', padding: '32px', border: `1px solid ${BORDER}` }}>
          <div style={{ marginBottom: '22px' }}>
            <label style={labelStyle}>Organization</label>
            <select
              value={form.nationalOrganization}
              onChange={set('nationalOrganization')}
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = GOLD }}
              onBlur={(e) => { e.currentTarget.style.borderColor = BORDER }}
            >
              {ORGANIZATIONS.map((org) => (
                <option key={org.value} value={org.value}>
                  {org.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            {FIELDS.map(({ key, label, type = 'text', placeholder }) => (
              <div key={key} style={{ gridColumn: FULL_WIDTH_KEYS.has(key) ? '1 / -1' : 'auto' }}>
                <label style={labelStyle}>{label}</label>
                <input
                  type={type}
                  value={(form as any)[key]}
                  onChange={set(key as keyof FormState)}
                  placeholder={placeholder}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = ROSE }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = BORDER }}
                />
              </div>
            ))}
          </div>

          {status === 'error' && (
            <div style={{ marginTop: '18px', padding: '12px 16px', backgroundColor: '#FFF3E0', border: '1px solid #FFB74D', borderRadius: '6px', color: '#E65100', fontSize: '0.875rem' }}>
              {errorMessage}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            style={{
              width: '100%',
              padding: '14px',
              marginTop: '24px',
              backgroundColor: status === 'submitting' ? '#f0a8cd' : ROSE,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              transition: 'opacity 0.15s',
            }}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit Chapter Blueprint'}
          </button>
        </div>

        <p style={{ textAlign: 'center', color: TEXT_MUTED, fontSize: '0.78rem', marginTop: '20px', lineHeight: 1.6 }}>
          Your information is kept strictly confidential and used only to configure your SisterHub portal.
        </p>
      </div>
    </main>
  )
}
