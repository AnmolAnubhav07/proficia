import { useEffect, useState, type FormEvent } from 'react'
import {
  addTraineeTraining,
  findLearnerIdByEmail,
  getTraineeContact,
  listPlacementsForTrainings,
  listProviderTrainings,
  logFollowUp,
  type FollowUpLog,
  type Placement,
  type Training,
} from '../../lib/api'
import { smsLink, telLink, whatsappLink } from '../../lib/outreach'

export default function ProviderDashboard({ userId }: { userId: string }) {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [placements, setPlacements] = useState<Placement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const [learnerEmail, setLearnerEmail] = useState('')
  const [courseName, setCourseName] = useState('')
  const [nsqfLevel, setNsqfLevel] = useState('')
  const [nativeId, setNativeId] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')

  const [followUpFor, setFollowUpFor] = useState<string | null>(null)
  const [channel, setChannel] = useState<FollowUpLog['channel']>('whatsapp')
  const [note, setNote] = useState('')
  const [contact, setContact] = useState<{ full_name: string; phone: string | null } | null>(null)

  async function refresh() {
    setLoading(true)
    try {
      const t = await listProviderTrainings(userId)
      setTrainings(t)
      setPlacements(await listPlacementsForTrainings(t.map((x) => x.id)))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load your trainees.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  async function handleAddTrainee(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setNotice(null)
    try {
      const learnerId = await findLearnerIdByEmail(learnerEmail)
      if (!learnerId) {
        setError('No learner account found with that email. They need to sign up first.')
        return
      }
      await addTraineeTraining({
        learner_id: learnerId,
        provider_id: userId,
        course_name: courseName,
        nsqf_level: nsqfLevel,
        native_id: nativeId || undefined,
        district: district || undefined,
        state: state || undefined,
      })
      setNotice(`Enrolled ${learnerEmail} in ${courseName}.`)
      setLearnerEmail('')
      setCourseName('')
      setNsqfLevel('')
      setNativeId('')
      setDistrict('')
      setState('')
      refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not enrol trainee.')
    }
  }

  async function openFollowUp(learnerId: string) {
    setFollowUpFor(learnerId)
    setContact(null)
    try {
      setContact(await getTraineeContact(learnerId))
    } catch {
      setContact(null)
    }
  }

  async function handleLogFollowUp(e: FormEvent, learnerId: string) {
    e.preventDefault()
    setError(null)
    try {
      await logFollowUp({ learner_id: learnerId, logged_by: userId, channel, note })
      setFollowUpFor(null)
      setNote('')
      setNotice('Follow-up logged.')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not log follow-up.')
    }
  }

  const defaultMessage =
    "Hi from your training provider — checking in on your progress. Reply here or call us if you need anything."

  const courseOutcomes = trainings.reduce<Record<string, { total: number; placed: number }>>((acc, t) => {
    acc[t.course_name] ??= { total: 0, placed: 0 }
    acc[t.course_name].total++
    if (placements.some((p) => p.training_id === t.id)) acc[t.course_name].placed++
    return acc
  }, {})

  return (
    <div className="ws-stack">
      {error && <p className="field-error">{error}</p>}
      {notice && <p className="ws-notice">{notice}</p>}

      <section className="ws-section">
        <div className="ws-section-head">
          <h2>Enrol a Trainee</h2>
        </div>
        <form className="ws-inline-form" onSubmit={handleAddTrainee}>
          <input
            className="ws-input"
            type="email"
            placeholder="Trainee's account email"
            required
            value={learnerEmail}
            onChange={(e) => setLearnerEmail(e.target.value)}
          />
          <input
            className="ws-input"
            placeholder="Course name"
            required
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <input
            className="ws-input"
            placeholder="NSQF level"
            value={nsqfLevel}
            onChange={(e) => setNsqfLevel(e.target.value)}
          />
          <input
            className="ws-input"
            placeholder="Native programme ID (optional)"
            value={nativeId}
            onChange={(e) => setNativeId(e.target.value)}
          />
          <input className="ws-input" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
          <input className="ws-input" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
          <button className="btn btn-primary" type="submit">
            Enrol
          </button>
        </form>
        <p className="ws-hint">The trainee must already have a Proficia account (any role) under this email.</p>
      </section>

      <section className="ws-section">
        <div className="ws-section-head">
          <h2>Course Outcomes</h2>
        </div>
        {Object.keys(courseOutcomes).length === 0 ? (
          <p className="ws-empty">No trainees enrolled yet.</p>
        ) : (
          <div className="ws-list">
            {Object.entries(courseOutcomes).map(([course, stats]) => (
              <div className="ws-row" key={course}>
                <div className="ws-row-main">
                  <span className="ws-row-title">{course}</span>
                  <span className="ws-row-meta mono">
                    {stats.placed} of {stats.total} placed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="ws-section">
        <div className="ws-section-head">
          <h2>My Trainees</h2>
        </div>
        {loading ? (
          <p className="auth-sub">Loading…</p>
        ) : trainings.length === 0 ? (
          <p className="ws-empty">No trainees yet — enrol one above.</p>
        ) : (
          <div className="ws-list">
            {trainings.map((t) => {
              const placement = placements.find((p) => p.training_id === t.id)
              return (
                <div className="ws-row" key={t.id}>
                  <div className="ws-row-main">
                    <span className="ws-row-title">{t.course_name}</span>
                    <span className="ws-row-meta mono">
                      {t.status} {placement ? `· placed at ${placement.company_name}` : '· not yet placed'}
                      {t.district ? ` · ${t.district}` : ''}
                    </span>
                  </div>
                  <div className="ws-row-actions">
                    <button className="btn btn-outline ws-btn-sm" type="button" onClick={() => openFollowUp(t.learner_id)}>
                      Follow Up
                    </button>
                  </div>

                  {followUpFor === t.learner_id && (
                    <form className="ws-subform" onSubmit={(e) => handleLogFollowUp(e, t.learner_id)}>
                      {contact?.phone ? (
                        <div className="ws-outreach-row">
                          <a
                            className="btn btn-outline ws-btn-sm"
                            href={whatsappLink(contact.phone, defaultMessage)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Open WhatsApp
                          </a>
                          <a className="btn btn-outline ws-btn-sm" href={smsLink(contact.phone, defaultMessage)}>
                            Open SMS
                          </a>
                          <a className="btn btn-outline ws-btn-sm" href={telLink(contact.phone)}>
                            Call
                          </a>
                        </div>
                      ) : (
                        <p className="ws-hint">No phone on file for this trainee — log a field-agent visit instead.</p>
                      )}
                      <select className="ws-input" value={channel} onChange={(e) => setChannel(e.target.value as FollowUpLog['channel'])}>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="sms">SMS</option>
                        <option value="call">Phone call</option>
                        <option value="field_agent">Field agent visit</option>
                      </select>
                      <input
                        className="ws-input"
                        placeholder="Note (what was discussed / outcome)"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                      <div className="ws-subform-actions">
                        <button className="btn btn-primary ws-btn-sm" type="submit">
                          Save
                        </button>
                        <button className="btn btn-outline ws-btn-sm" type="button" onClick={() => setFollowUpFor(null)}>
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
    </div>
  )
}
