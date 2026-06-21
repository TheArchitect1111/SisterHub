'use client'

import { useState } from 'react'

const WEBHOOK = process.env.MAKE_BLUEPRINT_WEBHOOK_URL ?? ''
const PRIMARY = '#1F3A5F'
const ACCENT_GOLD = '#C9B37E'
const SUCCESS = '#7A9B76'
const TEXT = '#2B2B2B'
const MUTED = '#6B7280'
const BORDER = '#E5E7EB'
const BG = '#FAF8F5'
const CARD = '#FFFFFF'
const FOCUS_COLOR = PRIMARY

// ─── Shared style helpers ────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 13px',
  backgroundColor: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: '6px',
  color: TEXT,
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: MUTED,
  marginBottom: '6px',
}

const cardStyle: React.CSSProperties = {
  backgroundColor: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: '10px',
  padding: '28px 28px 24px',
  marginBottom: '24px',
}

const sectionHeaderStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 700,
  color: PRIMARY,
  marginBottom: '22px',
  paddingBottom: '10px',
  borderBottom: `2px solid ${PRIMARY}`,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
}

// ─── Small input helpers ─────────────────────────────────────────────────────

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

function Input({ value, onChange, type = 'text', placeholder = '' }: {
  value: string; onChange: (v: string) => void; type?: string; placeholder?: string
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      style={inputStyle}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => { e.currentTarget.style.borderColor = FOCUS_COLOR }}
      onBlur={(e) => { e.currentTarget.style.borderColor = BORDER }}
    />
  )
}

function Sel({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: string[]
}) {
  return (
    <select
      value={value}
      style={{ ...inputStyle, cursor: 'pointer' }}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => { e.currentTarget.style.borderColor = FOCUS_COLOR }}
      onBlur={(e) => { e.currentTarget.style.borderColor = BORDER }}
    >
      <option value="">Select...</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function TA({ value, onChange, placeholder = '' }: {
  value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={3}
      style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => { e.currentTarget.style.borderColor = FOCUS_COLOR }}
      onBlur={(e) => { e.currentTarget.style.borderColor = BORDER }}
    />
  )
}

function YesNo({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <Sel value={value} onChange={onChange} options={['Yes', 'No']} />
}

function MultiCheck({ options, selected, onChange }: {
  options: string[]
  selected: string[]
  onChange: (v: string[]) => void
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) onChange(selected.filter((x) => x !== opt))
    else onChange([...selected, opt])
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
      {options.map((opt) => {
        const active = selected.includes(opt)
        return (
          <label
            key={opt}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px',
              border: `1px solid ${active ? ACCENT_GOLD : BORDER}`,
              borderRadius: '20px', cursor: 'pointer', fontSize: '0.82rem',
              backgroundColor: active ? '#F7F1E1' : CARD, color: active ? PRIMARY : TEXT,
              fontWeight: active ? 600 : 400, userSelect: 'none',
            }}
          >
            <input type="checkbox" checked={active} onChange={() => toggle(opt)} style={{ display: 'none' }} />
            {opt}
          </label>
        )
      })}
    </div>
  )
}

// ─── Form state type ─────────────────────────────────────────────────────────

type FD = {
  chapterName: string; nationalOrganization: string; chapterDesignation: string
  region: string; universityName: string; city: string; state: string
  chapterWebsite: string; chapterEmail: string; chapterPhone: string
  yearChartered: string; chapterType: string
  presidentName: string; presidentEmail: string; presidentPhone: string
  vpName: string; vpEmail: string; secretaryName: string; secretaryEmail: string
  treasurerName: string; treasurerEmail: string; parliamentarianName: string
  sergeantAtArmsName: string; advisorName: string; advisorEmail: string
  activeCommittees: string[]
  chairMembership: string; chairScholarship: string; chairCommunityService: string
  chairProgram: string; chairFinancial: string; chairSocialAction: string
  chairHealthWellness: string; chairPoliticalAwareness: string; chairArtsCulture: string
  committeeMeetingFrequency: string
  totalActiveMembers: string; graduateMembers: string; undergraduateMembers: string
  newMembersThisYear: string; membershipDues: string; duesFrequency: string
  intakeProcessActive: string; averageMemberAgeRange: string
  nationalProgramsRunning: string; localCommunityInitiatives: string
  primaryCommunityPartners: string; annualServiceHoursGoal: string; signatureAnnualEvent: string
  mentorshipProgramActive: string; sisterhoodEventsPerYear: string
  chapterCultureDescription: string; biggestSisterhoodChallenge: string; newMemberOnboardingProcess: string
  chapterGpaRequirement: string; scholarshipFundActive: string
  annualScholarshipAmount: string; scholarshipsAwardedPerYear: string; academicProgramsOffered: string
  annualBudgetRange: string; primaryFundraisingMethods: string
  financialSoftwareUsed: string; bankingInstitution: string
  communicationTools: string[]; socialMediaPlatforms: string[]
  instagramHandle: string; facebookPage: string; primaryCommunicationPainPoint: string
  numberOfEventsPerYear: string; signatureAnnualEvents: string
  foundersDayCelebration: string; regionalConferenceAttendance: string
  nationalConventionAttendance: string; eventPlanningTool: string
  topGoal: string; secondGoal: string; thirdGoal: string
  biggestChapterChallenge: string; whatSisterHubSolve: string; howDidYouHear: string
}

const INIT: FD = {
  chapterName: '', nationalOrganization: '', chapterDesignation: '',
  region: '', universityName: '', city: '', state: '',
  chapterWebsite: '', chapterEmail: '', chapterPhone: '',
  yearChartered: '', chapterType: '',
  presidentName: '', presidentEmail: '', presidentPhone: '',
  vpName: '', vpEmail: '', secretaryName: '', secretaryEmail: '',
  treasurerName: '', treasurerEmail: '', parliamentarianName: '',
  sergeantAtArmsName: '', advisorName: '', advisorEmail: '',
  activeCommittees: [],
  chairMembership: '', chairScholarship: '', chairCommunityService: '',
  chairProgram: '', chairFinancial: '', chairSocialAction: '',
  chairHealthWellness: '', chairPoliticalAwareness: '', chairArtsCulture: '',
  committeeMeetingFrequency: '',
  totalActiveMembers: '', graduateMembers: '', undergraduateMembers: '',
  newMembersThisYear: '', membershipDues: '', duesFrequency: '',
  intakeProcessActive: '', averageMemberAgeRange: '',
  nationalProgramsRunning: '', localCommunityInitiatives: '',
  primaryCommunityPartners: '', annualServiceHoursGoal: '', signatureAnnualEvent: '',
  mentorshipProgramActive: '', sisterhoodEventsPerYear: '',
  chapterCultureDescription: '', biggestSisterhoodChallenge: '', newMemberOnboardingProcess: '',
  chapterGpaRequirement: '', scholarshipFundActive: '',
  annualScholarshipAmount: '', scholarshipsAwardedPerYear: '', academicProgramsOffered: '',
  annualBudgetRange: '', primaryFundraisingMethods: '',
  financialSoftwareUsed: '', bankingInstitution: '',
  communicationTools: [], socialMediaPlatforms: [],
  instagramHandle: '', facebookPage: '', primaryCommunicationPainPoint: '',
  numberOfEventsPerYear: '', signatureAnnualEvents: '',
  foundersDayCelebration: '', regionalConferenceAttendance: '',
  nationalConventionAttendance: '', eventPlanningTool: '',
  topGoal: '', secondGoal: '', thirdGoal: '',
  biggestChapterChallenge: '', whatSisterHubSolve: '', howDidYouHear: '',
}

const COMMITTEE_LIST = [
  'Membership', 'Scholarship', 'Community Service', 'Program',
  'Financial', 'Social Action', 'Health & Wellness', 'Political Awareness', 'Arts & Culture',
]

const COMMITTEE_KEY: Record<string, keyof FD> = {
  'Membership': 'chairMembership',
  'Scholarship': 'chairScholarship',
  'Community Service': 'chairCommunityService',
  'Program': 'chairProgram',
  'Financial': 'chairFinancial',
  'Social Action': 'chairSocialAction',
  'Health & Wellness': 'chairHealthWellness',
  'Political Awareness': 'chairPoliticalAwareness',
  'Arts & Culture': 'chairArtsCulture',
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function BlueprintPage() {
  const [fd, setFd] = useState<FD>(INIT)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (key: keyof FD) => (val: string) =>
    setFd((p) => ({ ...p, [key]: val }))

  const setArr = (key: keyof FD) => (val: string[]) =>
    setFd((p) => ({ ...p, [key]: val }))

  const handleSubmit = async () => {
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fd),
      })
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      setStatus('success')
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: '460px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: SUCCESS, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#fff', fontSize: '1.75rem' }}>
            &#10003;
          </div>
          <h2 style={{ color: TEXT, fontSize: '1.75rem', fontWeight: 700, marginBottom: '12px' }}>Blueprint Received</h2>
          <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: '10px' }}>
            Thank you, <strong style={{ color: TEXT }}>{fd.chapterName || 'your chapter'}</strong>. We will review your information and be in touch within 24 to 48 hours.
          </p>
          {fd.chapterEmail && (
            <p style={{ color: MUTED, fontSize: '0.875rem' }}>
              Confirmation sent to <strong style={{ color: TEXT }}>{fd.chapterEmail}</strong>.
            </p>
          )}
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 48px', borderBottom: `1px solid ${BORDER}`, backgroundColor: CARD, position: 'sticky', top: 0, zIndex: 10 }}>
        <a href="/" style={{ fontSize: '1.3rem', fontWeight: 700, color: TEXT, textDecoration: 'none' }}>
          Sister<span style={{ color: ACCENT_GOLD }}>Hub</span>
        </a>
        <span style={{ color: MUTED, fontSize: '0.82rem' }}>Chapter Intake Form</span>
      </nav>

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ marginBottom: '36px' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: TEXT, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Chapter Blueprint
          </h1>
          <div style={{ width: '32px', height: '3px', backgroundColor: ACCENT_GOLD, borderRadius: '2px', marginBottom: '12px' }} />
          <p style={{ color: MUTED, fontSize: '0.9rem', lineHeight: 1.7 }}>
            Complete all sections to help us configure your SisterHub portal. Your information is kept strictly confidential.
          </p>
        </div>

        {/* SECTION 1 - Chapter Operations */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Section 1 — Chapter Operations</div>
          <div style={gridStyle}>
            <F label="Chapter Name"><Input value={fd.chapterName} onChange={set('chapterName')} /></F>
            <F label="National Organization">
              <Sel value={fd.nationalOrganization} onChange={set('nationalOrganization')} options={[
                'Alpha Kappa Alpha (AKA)', 'Delta Sigma Theta (DST)', 'Zeta Phi Beta (ZPB)',
                'Sigma Gamma Rho (SGR)', 'Alpha Chi Omega', 'Chi Omega', 'Delta Delta Delta',
                'Kappa Kappa Gamma', 'Pi Beta Phi', 'Other',
              ]} />
            </F>
            <F label="Chapter Designation"><Input value={fd.chapterDesignation} onChange={set('chapterDesignation')} placeholder="e.g. Alpha Mu" /></F>
            <F label="Region"><Input value={fd.region} onChange={set('region')} placeholder="e.g. Northeast" /></F>
            <div style={{ gridColumn: '1 / -1' }}>
              <F label="University / College"><Input value={fd.universityName} onChange={set('universityName')} placeholder="e.g. Howard University" /></F>
            </div>
            <F label="City"><Input value={fd.city} onChange={set('city')} /></F>
            <F label="State"><Input value={fd.state} onChange={set('state')} /></F>
            <div style={{ gridColumn: '1 / -1' }}>
              <F label="Chapter Website"><Input value={fd.chapterWebsite} onChange={set('chapterWebsite')} type="url" placeholder="https://" /></F>
            </div>
            <F label="Chapter Email"><Input value={fd.chapterEmail} onChange={set('chapterEmail')} type="email" /></F>
            <F label="Chapter Phone"><Input value={fd.chapterPhone} onChange={set('chapterPhone')} type="tel" /></F>
            <F label="Year Chartered"><Input value={fd.yearChartered} onChange={set('yearChartered')} placeholder="e.g. 1952" /></F>
            <F label="Chapter Type">
              <Sel value={fd.chapterType} onChange={set('chapterType')} options={['Undergraduate', 'Graduate', 'Alumni']} />
            </F>
          </div>
        </div>

        {/* SECTION 2 - Leadership Structure */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Section 2 — Leadership Structure</div>
          <div style={gridStyle}>
            <F label="President Name"><Input value={fd.presidentName} onChange={set('presidentName')} /></F>
            <F label="President Email"><Input value={fd.presidentEmail} onChange={set('presidentEmail')} type="email" /></F>
            <F label="President Phone"><Input value={fd.presidentPhone} onChange={set('presidentPhone')} type="tel" /></F>
            <F label="Vice President Name"><Input value={fd.vpName} onChange={set('vpName')} /></F>
            <F label="Vice President Email"><Input value={fd.vpEmail} onChange={set('vpEmail')} type="email" /></F>
            <F label="Secretary Name"><Input value={fd.secretaryName} onChange={set('secretaryName')} /></F>
            <F label="Secretary Email"><Input value={fd.secretaryEmail} onChange={set('secretaryEmail')} type="email" /></F>
            <F label="Treasurer Name"><Input value={fd.treasurerName} onChange={set('treasurerName')} /></F>
            <F label="Treasurer Email"><Input value={fd.treasurerEmail} onChange={set('treasurerEmail')} type="email" /></F>
            <F label="Parliamentarian Name"><Input value={fd.parliamentarianName} onChange={set('parliamentarianName')} /></F>
            <F label="Sergeant-at-Arms Name"><Input value={fd.sergeantAtArmsName} onChange={set('sergeantAtArmsName')} /></F>
            <F label="Advisor Name"><Input value={fd.advisorName} onChange={set('advisorName')} /></F>
            <F label="Advisor Email"><Input value={fd.advisorEmail} onChange={set('advisorEmail')} type="email" /></F>
          </div>
        </div>

        {/* SECTION 3 - Committee Structure */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Section 3 — Committee Structure</div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Active Committees (select all that apply)</label>
            <MultiCheck options={COMMITTEE_LIST} selected={fd.activeCommittees} onChange={setArr('activeCommittees')} />
          </div>
          {fd.activeCommittees.length > 0 && (
            <div style={{ ...gridStyle, marginBottom: '20px' }}>
              {fd.activeCommittees.map((c) => (
                <F key={c} label={`${c} Chair Name`}>
                  <Input value={fd[COMMITTEE_KEY[c]] as string} onChange={set(COMMITTEE_KEY[c])} />
                </F>
              ))}
            </div>
          )}
          <F label="How Often Do Committees Meet">
            <Sel value={fd.committeeMeetingFrequency} onChange={set('committeeMeetingFrequency')} options={['Weekly', 'Bi-weekly', 'Monthly']} />
          </F>
        </div>

        {/* SECTION 4 - Member Information */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Section 4 — Member Information</div>
          <div style={gridStyle}>
            <F label="Total Active Members"><Input value={fd.totalActiveMembers} onChange={set('totalActiveMembers')} type="number" /></F>
            <F label="Graduate Members Count"><Input value={fd.graduateMembers} onChange={set('graduateMembers')} type="number" /></F>
            <F label="Undergraduate Members Count"><Input value={fd.undergraduateMembers} onChange={set('undergraduateMembers')} type="number" /></F>
            <F label="New Members This Year"><Input value={fd.newMembersThisYear} onChange={set('newMembersThisYear')} type="number" /></F>
            <F label="Membership Dues Amount ($)"><Input value={fd.membershipDues} onChange={set('membershipDues')} type="number" /></F>
            <F label="Dues Frequency">
              <Sel value={fd.duesFrequency} onChange={set('duesFrequency')} options={['Monthly', 'Semester', 'Annual']} />
            </F>
            <F label="Intake Process Active"><YesNo value={fd.intakeProcessActive} onChange={set('intakeProcessActive')} /></F>
            <F label="Average Member Age Range"><Input value={fd.averageMemberAgeRange} onChange={set('averageMemberAgeRange')} placeholder="e.g. 18-22" /></F>
          </div>
        </div>

        {/* SECTION 5 - Signature Programs */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Section 5 — Signature Programs</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <F label="National Programs Currently Running"><TA value={fd.nationalProgramsRunning} onChange={set('nationalProgramsRunning')} /></F>
            <F label="Local Community Initiatives"><TA value={fd.localCommunityInitiatives} onChange={set('localCommunityInitiatives')} /></F>
            <div style={gridStyle}>
              <F label="Primary Community Partners"><Input value={fd.primaryCommunityPartners} onChange={set('primaryCommunityPartners')} /></F>
              <F label="Annual Service Hours Goal"><Input value={fd.annualServiceHoursGoal} onChange={set('annualServiceHoursGoal')} type="number" /></F>
              <div style={{ gridColumn: '1 / -1' }}>
                <F label="Signature Annual Event Name"><Input value={fd.signatureAnnualEvent} onChange={set('signatureAnnualEvent')} /></F>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6 - Sisterhood & Culture */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Section 6 — Sisterhood and Culture</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={gridStyle}>
              <F label="Mentorship Program Active"><YesNo value={fd.mentorshipProgramActive} onChange={set('mentorshipProgramActive')} /></F>
              <F label="Sisterhood Events Per Year"><Input value={fd.sisterhoodEventsPerYear} onChange={set('sisterhoodEventsPerYear')} type="number" /></F>
            </div>
            <F label="Chapter Culture Description"><TA value={fd.chapterCultureDescription} onChange={set('chapterCultureDescription')} /></F>
            <F label="Biggest Sisterhood Challenge"><TA value={fd.biggestSisterhoodChallenge} onChange={set('biggestSisterhoodChallenge')} /></F>
            <F label="New Member Onboarding Process"><TA value={fd.newMemberOnboardingProcess} onChange={set('newMemberOnboardingProcess')} /></F>
          </div>
        </div>

        {/* SECTION 7 - Academic & Scholarship */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Section 7 — Academic and Scholarship</div>
          <div style={gridStyle}>
            <F label="Chapter GPA Requirement"><Input value={fd.chapterGpaRequirement} onChange={set('chapterGpaRequirement')} placeholder="e.g. 2.5" /></F>
            <F label="Scholarship Fund Active"><YesNo value={fd.scholarshipFundActive} onChange={set('scholarshipFundActive')} /></F>
            <F label="Annual Scholarship Amount ($)"><Input value={fd.annualScholarshipAmount} onChange={set('annualScholarshipAmount')} type="number" /></F>
            <F label="Scholarships Awarded Per Year"><Input value={fd.scholarshipsAwardedPerYear} onChange={set('scholarshipsAwardedPerYear')} type="number" /></F>
            <div style={{ gridColumn: '1 / -1' }}>
              <F label="Academic Programs Offered"><TA value={fd.academicProgramsOffered} onChange={set('academicProgramsOffered')} /></F>
            </div>
          </div>
        </div>

        {/* SECTION 8 - Financial */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Section 8 — Financial</div>
          <div style={gridStyle}>
            <F label="Annual Budget Range">
              <Sel value={fd.annualBudgetRange} onChange={set('annualBudgetRange')} options={['Under $5K', '$5K-$15K', '$15K-$30K', '$30K-$50K', 'Over $50K']} />
            </F>
            <F label="Financial Software Used"><Input value={fd.financialSoftwareUsed} onChange={set('financialSoftwareUsed')} placeholder="e.g. QuickBooks, Wave" /></F>
            <F label="Banking Institution"><Input value={fd.bankingInstitution} onChange={set('bankingInstitution')} /></F>
            <div style={{ gridColumn: '1 / -1' }}>
              <F label="Primary Fundraising Methods"><TA value={fd.primaryFundraisingMethods} onChange={set('primaryFundraisingMethods')} /></F>
            </div>
          </div>
        </div>

        {/* SECTION 9 - Communication */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Section 9 — Communication</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Current Communication Tools (select all that apply)</label>
              <MultiCheck options={['Email', 'GroupMe', 'Slack', 'Band', 'WhatsApp', 'Facebook', 'Instagram', 'Other']} selected={fd.communicationTools} onChange={setArr('communicationTools')} />
            </div>
            <div>
              <label style={labelStyle}>Social Media Platforms Active (select all that apply)</label>
              <MultiCheck options={['Instagram', 'Facebook', 'Twitter/X', 'TikTok', 'LinkedIn', 'YouTube']} selected={fd.socialMediaPlatforms} onChange={setArr('socialMediaPlatforms')} />
            </div>
            <div style={gridStyle}>
              <F label="Instagram Handle"><Input value={fd.instagramHandle} onChange={set('instagramHandle')} placeholder="@yourchapter" /></F>
              <F label="Facebook Page"><Input value={fd.facebookPage} onChange={set('facebookPage')} /></F>
            </div>
            <F label="Primary Communication Pain Point"><TA value={fd.primaryCommunicationPainPoint} onChange={set('primaryCommunicationPainPoint')} /></F>
          </div>
        </div>

        {/* SECTION 10 - Events & Calendar */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Section 10 — Events and Calendar</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={gridStyle}>
              <F label="Number of Events Per Year"><Input value={fd.numberOfEventsPerYear} onChange={set('numberOfEventsPerYear')} type="number" /></F>
              <F label="Event Planning Tool Currently Used"><Input value={fd.eventPlanningTool} onChange={set('eventPlanningTool')} placeholder="e.g. Google Calendar" /></F>
              <F label="Founders Day Celebration"><YesNo value={fd.foundersDayCelebration} onChange={set('foundersDayCelebration')} /></F>
              <F label="Regional Conference Attendance"><YesNo value={fd.regionalConferenceAttendance} onChange={set('regionalConferenceAttendance')} /></F>
              <F label="National Convention Attendance"><YesNo value={fd.nationalConventionAttendance} onChange={set('nationalConventionAttendance')} /></F>
            </div>
            <F label="Signature Annual Events"><TA value={fd.signatureAnnualEvents} onChange={set('signatureAnnualEvents')} /></F>
          </div>
        </div>

        {/* SECTION 11 - Goals & Challenges */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Section 11 — Goals and Challenges</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <F label="Top Goal for Next 12 Months"><TA value={fd.topGoal} onChange={set('topGoal')} /></F>
            <F label="Second Goal"><TA value={fd.secondGoal} onChange={set('secondGoal')} /></F>
            <F label="Third Goal"><TA value={fd.thirdGoal} onChange={set('thirdGoal')} /></F>
            <F label="Biggest Chapter Challenge"><TA value={fd.biggestChapterChallenge} onChange={set('biggestChapterChallenge')} /></F>
            <F label="What Do You Want SisterHub to Solve"><TA value={fd.whatSisterHubSolve} onChange={set('whatSisterHubSolve')} /></F>
            <F label="How Did You Hear About SisterHub">
              <Sel value={fd.howDidYouHear} onChange={set('howDidYouHear')} options={['Social Media', 'Word of Mouth', 'Referral', 'Conference', 'Other']} />
            </F>
          </div>
        </div>

        {/* Error */}
        {status === 'error' && (
          <div style={{ padding: '14px 18px', backgroundColor: '#F7F1E1', border: `1px solid ${BORDER}`, borderRadius: '8px', color: PRIMARY, fontSize: '0.875rem', marginBottom: '20px' }}>
            {errorMsg}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={status === 'submitting'}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: status === 'submitting' ? SUCCESS : PRIMARY,
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Chapter Blueprint'}
        </button>

        <p style={{ textAlign: 'center', color: MUTED, fontSize: '0.75rem', marginTop: '16px' }}>
          Your information is kept strictly confidential and used only to configure your SisterHub portal.
        </p>
      </div>
    </main>
  )
}
