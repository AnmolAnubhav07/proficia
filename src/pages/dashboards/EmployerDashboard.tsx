import { useEffect, useState } from 'react'
import { confirmPlacement, listEmployerPlacements, type EmployerPlacementRow } from '../../lib/api'

export default function EmployerDashboard() {
  const [rows, setRows] = useState<EmployerPlacementRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [confirming, setConfirming] = useState<string | null>(null)

  async function refresh() {
    setLoading(true)
    try {
      setRows(await listEmployerPlacements())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load placements.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  async function handleConfirm(id: string) {
    setConfirming(id)
    setError(null)
    try {
      await confirmPlacement(id)
      refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not confirm placement.')
    } finally {
      setConfirming(null)
    }
  }

  const pending = rows.filter((r) => !r.employer_verified)
  const verified = rows.filter((r) => r.employer_verified)

  return (
    <div className="ws-stack">
      {error && <p className="field-error">{error}</p>}
      <p className="ws-hint">
        Matched to your company name from signup. Set it exactly as trainees will enter it as their employer.
      </p>

      <section className="ws-section">
        <div className="ws-section-head">
          <h2>Pending Verification</h2>
        </div>
        {loading ? (
          <p className="auth-sub">Loading…</p>
        ) : pending.length === 0 ? (
          <p className="ws-empty">Nothing waiting on you right now.</p>
        ) : (
          <div className="ws-list">
            {pending.map((r) => (
              <div className="ws-row" key={r.id}>
                <div className="ws-row-main">
                  <span className="ws-row-title">{r.learner_name}</span>
                  <span className="ws-row-meta mono">
                    {r.role_title || 'Role not specified'} {r.wage ? `· ₹${r.wage}/mo` : ''}
                  </span>
                </div>
                <div className="ws-row-actions">
                  <button
                    className="btn btn-primary ws-btn-sm"
                    type="button"
                    disabled={confirming === r.id}
                    onClick={() => handleConfirm(r.id)}
                  >
                    {confirming === r.id ? 'Confirming…' : 'Confirm Placement'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="ws-section">
        <div className="ws-section-head">
          <h2>Verified Hires</h2>
        </div>
        {verified.length === 0 ? (
          <p className="ws-empty">No confirmed placements yet.</p>
        ) : (
          <div className="ws-list">
            {verified.map((r) => (
              <div className="ws-row" key={r.id}>
                <div className="ws-row-main">
                  <span className="ws-row-title">{r.learner_name}</span>
                  <span className="ws-row-meta mono">{r.role_title || 'Role not specified'}</span>
                </div>
                <span className="status-badge status-badge-done">Verified</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
