'use client'

import { useState } from 'react'

const PLUM_BG = '#1C0A2E'
const PLUM_SURFACE = '#2A1247'
const PLUM_BORDER = '#3D1A60'
const GOLD = '#CFB53B'
const ROSE = '#E84393'
const TEXT_PRIMARY = '#FAF6F1'
const TEXT_MUTED = '#C4B0D8'
const TEXT_LABEL = '#CFB53B'

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

export default function BlueprintPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async () => {
    const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL
    if (!webhookUrl) {
      setErrorMessage('Webhook URL is not configured.')
      setStatus('error')
      return
    }
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
    padding: '12px 16px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: `1px solid ${PLUM_BORDER}`,
    borderRadius: '6px',
    color: TEXT_PRIMARY,
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: TEXT_LABEL,
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: '8px',
    fontWeight: 600,
  }

  if (status === 'success') {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: PLUM_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: ROSE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '2rem' }}>
            &#10003;
          </div>
          <h2 style={{ color: TEXT_PRIMARY, fontSize: '2rem', fontWeight: 300, marginBottom: '16px' }}>Blueprint Received</h2>
          <p style={{ color: TEXT_MUTED, lineHeight: 1.8, marginBottom: '12px' }}>
            Thank you, <span style={{ color: GOLD }}>{form.chapterName || 'your chapter'}</span>. We will review your information and be in touch within 24 to 48 hours.
          </p>
          <p style={{ color: TEXT_MUTED, fontSize: '0.9rem' }}>Check your inbox at <span style={{ color: GOLD }}>{form.chapterEmail}</span> for confirmation.</p>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: PLUM_BG, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderBottom: `1px solid ${PLUM_BORDER}` }}>
        <a href="/" style={{ fontSize: '1.4rem', fontWeight: 600, color: TEXT_PRIMARY, textDecoration: 'none', letterSpacing: '-0.02em' }}>
          Sister<span style={{ color: GOLD }}>Hub</span>
        </a>
        <span style={{ color: TEXT_MUTED, fontSize: '0.85rem' }}>Chapter Intake</span>
      </nav>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '60px 32px' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ color: TEXT_PRIMARY, fontSize: '2.25rem', fontWeight: 300, marginBottom: '12px', lineHeight: 1.2 }}>
            Chapter Blueprint
          </h1>
          <div style={{ width: '40px', height: '3px', backgroundColor: ROSE, borderRadius: '2px', marginBottom: '16px' }} />
          <p style={{ color: TEXT_MUTED, fontSize: '0.95rem', lineHeight: 1.7 }}>
            Tell us about your chapter. We use this information to configure your SisterHub portal and tailor your onboarding experience.
          </p>
        </div>

        <div style={{ backgroundColor: PLUM_SURFACE, borderRadius: '12px', padding: '36px', border: `1px solid ${PLUM_BORDER}` }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Organization</label>
            <select
              value={form.nationalOrganization}
              onChange={set('nationalOrganization')}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {ORGANIZATIONS.map((org) => (
                <option key={org.value} value={org.value} style={{ backgroundColor: PLUM_SURFACE, color: TEXT_PRIMARY }}>
                  {org.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {FIELDS.map(({ key, label, type = 'text', placeholder }) => {
              const isFullWidth = key === 'chapterEmail' || key === 'presidentName' || key === 'presidentEmail' || key === 'universityName' || key === 'chapterName'
              return (
                <div key={key} style={{ gridColumn: isFullWidth ? '1 / -1' : 'auto' }}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    type={type}
                    value={(form as any)[key]}
                    onChange={set(key as keyof FormState)}
                    placeholder={placeholder}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = ROSE }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = PLUM_BORDER }}
                  />
                </div>
              )
            })}
          </div>

          {status === 'error' && (
            <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: 'rgba(232,67,147,0.12)', border: `1px solid rgba(232,67,147,0.3)`, borderRadius: '6px', color: '#F472B6', fontSize: '0.875rem' }}>
              {errorMessage}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            style={{
              width: '100%',
              padding: '15px',
              marginTop: '28px',
              backgroundColor: status === 'submitting' ? 'rgba(232,67,147,0.5)' : ROSE,
              color: TEXT_PRIMARY,
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s',
              fontFamily: 'inherit',
            }}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit Chapter Blueprint'}
          </button>
        </div>

        <p style={{ textAlign: 'center', color: TEXT_MUTED, fontSize: '0.8rem', marginTop: '24px', lineHeight: 1.6 }}>
          Your information is kept strictly confidential and used only to configure your SisterHub portal.
        </p>
      </div>
    </main>
  )
}
