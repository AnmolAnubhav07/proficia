import { useEffect, useState, type FormEvent } from 'react'
import {
  addCheckin,
  addPlacement,
  addTraining,
  listMyCheckins,
  listMyFollowUps,
  listMyPlacements,
  listMyTrainings,
  setNonPlacementReason,
  type FollowUpLog,
  type Placement,
  type RetentionCheckin,
  type Training,
} from '../../lib/api'

const channelLabels: Record<FollowUpLog['channel'], string> = {
  whatsapp: 'WhatsApp',
  sms: 'SMS',
  call: 'Phone call',
  field_agent: 'Field agent visit',
}

export default function LearnerDashboard({ userId }: { userId: string }) {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [placements, setPlacements] = useState<Placement[]>([])
  const [checkins, setCheckins] = useState<RetentionCheckin[]>([])
  const [followUps, setFollowUps] = useState<FollowUpLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [courseName, setCourseName] = useState('')
  const [nsqfLevel, setNsqfLevel] = useState('')

  const [placementFor, setPlacementFor] = useState<string | null>(null)
  const [placementType, setPlacementType] = useState<Placement['placement_type']>('formal')
  const [companyName, setCompanyName] = useState('')
  const [roleTitle, setRoleTitle] = useState('')
  const [wage, setWage] = useState('')
  const [joiningDate, setJoiningDate] = useState('')

  const [checkinFor, setCheckinFor] = useState<string | null>(null)
  const [checkinMonth, setCheckinMonth] = useState<RetentionCheckin['checkin_month']>(3)
  const [checkinStatus, setCheckinStatus] = useState<RetentionCheckin['status']>('retained')
  const [checkinWage, setCheckinWage] = useState('')

  async function refresh() {
    setLoading(true)
    try {
      const [t, p, c, f] = await Promise.all([
        listMyTrainings(userId),
        listMyPlacements(userId),
        listMyCheckins(userId),
        listMyFollowUps(userId),
      ])
      setTrainings(t)
      setPlacements(p)
      setCheckins(c)
      setFollowUps(f)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load your data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  async function handleAddTraining(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await addTraining({ learner_id: userId, course_name: courseName, nsqf_level: nsqfLevel })
      setCourseName('')
      setNsqfLevel('')
      refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not add training.')
    }
  }

  async function handleAddPlacement(e: FormEvent) {
    e.preventDefault()
    if (!placementFor) return
    setError(null)
    try {
      await addPlacement({
        training_id: placementFor,
        learner_id: userId,
        placement_type: placementType,
        company_name: companyName,
        role_title: roleTitle,
        wage: wage ? Number(wage) : null,
        joining_date: joiningDate || null,
      })
      setPlacementFor(null)
      setCompanyName('')
      setRoleTitle('')
      setWage('')
      setJoiningDate('')
      refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not add placement.')
    }
  }

  async function handleAddCheckin(e: FormEvent) {
    e.preventDefault()
    if (!checkinFor) return
    setError(null)
    try {
      await addCheckin({
        placement_id: checkinFor,
        learner_id: userId,
        checkin_month: checkinMonth,
        status: checkinStatus,
        wage: checkinWage ? Number(checkinWage) : null,
      })
      setCheckinFor(null)
      setCheckinWage('')
      refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not add check-in.')
    }
  }

  async function handleReason(trainingId: string) {
    const reason = window.prompt('Why hasn’t this training led to a placement yet?')
    if (!reason) return
    try {
      await setNonPlacementReason(trainingId, reason)
      refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save reason.')
    }
  }

  return (
    <div className="ws-stack">
      {error && <p className="field-error">{error}</p>}

      <section className="ws-section">
        <div className="ws-section-head">
          <h2>My Trainings</h2>
        </div>
        <form className="ws-inline-form" onSubmit={handleAddTraining}>
          <input
            className="ws-input"
            placeholder="Course name (e.g. Data Analytics)"
            required
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <input
            className="ws-input"
            placeholder="NSQF level (e.g. Level 4)"
            value={nsqfLevel}
            onChange={(e) => setNsqfLevel(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Add Training
          </button>
        </form>

        {loading ? (
          <p className="auth-sub">Loading…</p>
        ) : trainings.length === 0 ? (
          <p className="ws-empty">No trainings added yet.</p>
        ) : (
          <div className="ws-list">
            {trainings.map((t) => {
              const hasPlacement = placements.some((p) => p.training_id === t.id)
              return (
                <div className="ws-row" key={t.id}>
                  <div className="ws-row-main">
                    <span className="ws-row-title">{t.course_name}</span>
                    <span className="ws-row-meta mono">
                      {t.nsqf_level || 'Level not set'} · {t.status}
                    </span>
                    {t.non_placement_reason && (
                      <span className="ws-row-note">Reason logged: {t.non_placement_reason}</span>
                    )}
                  </div>
                  <div className="ws-row-actions">
                    {!hasPlacement && (
                      <>
                        <button className="btn btn-outline ws-btn-sm" type="button" onClick={() => setPlacementFor(t.id)}>
                          Add Placement
                        </button>
                        <button className="btn btn-outline ws-btn-sm" type="button" onClick={() => handleReason(t.id)}>
                          Log Non-Placement Reason
                        </button>
                      </>
                    )}
                  </div>

                  {placementFor === t.id && (
                    <form className="ws-subform" onSubmit={handleAddPlacement}>
                      <select
                        className="ws-input"
                        value={placementType}
                        onChange={(e) => setPlacementType(e.target.value as Placement['placement_type'])}
                      >
                        <option value="formal">Formal job</option>
                        <option value="self_employed">Self-employed</option>
                        <option value="apprenticeship">Apprenticeship</option>
                      </select>
                      <input
                        className="ws-input"
                        placeholder="Company / business name"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      <input
                        className="ws-input"
                        placeholder="Role title"
                        value={roleTitle}
                        onChange={(e) => setRoleTitle(e.target.value)}
                      />
                      <input
                        className="ws-input"
                        type="number"
                        placeholder="Monthly wage (₹)"
                        value={wage}
                        onChange={(e) => setWage(e.target.value)}
                      />
                      <input
                        className="ws-input"
                        type="date"
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
                      />
                      <div className="ws-subform-actions">
                        <button className="btn btn-primary ws-btn-sm" type="submit">
                          Save Placement
                        </button>
                        <button
                          className="btn btn-outline ws-btn-sm"
                          type="button"
                          onClick={() => setPlacementFor(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section className="ws-section">
        <div className="ws-section-head">
          <h2>My Placements</h2>
        </div>
        {placements.length === 0 ? (
          <p className="ws-empty">No placements recorded yet.</p>
        ) : (
          <div className="ws-list">
            {placements.map((p) => (
              <div className="ws-row" key={p.id}>
                <div className="ws-row-main">
                  <span className="ws-row-title">
                    {p.role_title || 'Role not set'} · {p.company_name}
                  </span>
                  <span className="ws-row-meta mono">
                    {p.placement_type.replace('_', ' ')} {p.wage ? `· ₹${p.wage}/mo` : ''}
                  </span>
                </div>
                <div className="ws-row-actions">
                  <span className={`status-badge ${p.employer_verified ? 'status-badge-done' : 'status-badge-planned'}`}>
                    {p.employer_verified ? 'Employer Verified' : 'Pending Verification'}
                  </span>
                  <button className="btn btn-outline ws-btn-sm" type="button" onClick={() => setCheckinFor(p.id)}>
                    Add Check-in
                  </button>
                </div>

                {checkinFor === p.id && (
                  <form className="ws-subform" onSubmit={handleAddCheckin}>
                    <select
                      className="ws-input"
                      value={checkinMonth}
                      onChange={(e) => setCheckinMonth(Number(e.target.value) as RetentionCheckin['checkin_month'])}
                    >
                      <option value={3}>3 months</option>
                      <option value={6}>6 months</option>
                      <option value={12}>12 months</option>
                      <option value={24}>24 months</option>
                    </select>
                    <select
                      className="ws-input"
                      value={checkinStatus}
                      onChange={(e) => setCheckinStatus(e.target.value as RetentionCheckin['status'])}
                    >
                      <option value="retained">Retained at same employer</option>
                      <option value="changed_employer">Changed employer, still employed</option>
                      <option value="unemployed">Unemployed</option>
                    </select>
                    <input
                      className="ws-input"
                      type="number"
                      placeholder="Current wage (₹)"
                      value={checkinWage}
                      onChange={(e) => setCheckinWage(e.target.value)}
                    />
                    <div className="ws-subform-actions">
                      <button className="btn btn-primary ws-btn-sm" type="submit">
                        Save Check-in
                      </button>
                      <button className="btn btn-outline ws-btn-sm" type="button" onClick={() => setCheckinFor(null)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {checkins.filter((c) => c.placement_id === p.id).length > 0 && (
                  <div className="ws-checkin-track">
                    {checkins
                      .filter((c) => c.placement_id === p.id)
                      .map((c) => (
                        <span className="pill mono" key={c.id}>
                          {c.checkin_month}M: {c.status.replace('_', ' ')}
                          {c.wage ? ` · ₹${c.wage}` : ''}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="ws-section">
        <div className="ws-section-head">
          <h2>Follow-Up History</h2>
        </div>
        {followUps.length === 0 ? (
          <p className="ws-empty">No follow-ups logged by your training provider yet.</p>
        ) : (
          <div className="ws-list">
            {followUps.map((f) => (
              <div className="ws-row" key={f.id}>
                <div className="ws-row-main">
                  <span className="ws-row-title">{channelLabels[f.channel]}</span>
                  <span className="ws-row-meta">{f.note}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
