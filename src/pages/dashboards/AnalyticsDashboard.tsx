import { useEffect, useMemo, useState } from 'react'
import { clusterNonPlacementReasons, getOutcomeAggregates, type OutcomeAggregates } from '../../lib/api'

export default function AnalyticsDashboard({ role }: { role: 'policymaker' | 'funder' }) {
  const [data, setData] = useState<OutcomeAggregates | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getOutcomeAggregates()
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load analytics.'))
  }, [])

  const retentionRate = data && data.total_checkins > 0 ? Math.round((data.retained_checkins / data.total_checkins) * 100) : null
  const verificationRate = data && data.total_placements > 0 ? Math.round((data.verified_placements / data.total_placements) * 100) : null
  const reasonClusters = useMemo(() => (data ? clusterNonPlacementReasons(data.non_placement_reasons) : []), [data])

  return (
    <div className="ws-stack">
      {error && <p className="field-error">{error}</p>}
      <p className="ws-hint">
        {role === 'policymaker'
          ? 'Live counts across every provider and district in this deployment — no synthetic numbers.'
          : 'Evidence of outcomes tied to real placement and retention records in this deployment.'}
      </p>

      {!data ? (
        <p className="auth-sub">Loading…</p>
      ) : (
        <>
          <div className="status-summary ws-analytics-summary">
            <div className="status-summary-item">
              <span className="status-summary-value mono">{data.total_trainings}</span>
              <span className="status-summary-label">Total trainings</span>
            </div>
            <div className="status-summary-item">
              <span className="status-summary-value mono">{data.total_placements}</span>
              <span className="status-summary-label">Total placements</span>
            </div>
            <div className="status-summary-item">
              <span className="status-summary-value mono status-done-text">
                {verificationRate !== null ? `${verificationRate}%` : '—'}
              </span>
              <span className="status-summary-label">Employer-verified</span>
            </div>
            <div className="status-summary-item">
              <span className="status-summary-value mono status-done-text">
                {retentionRate !== null ? `${retentionRate}%` : '—'}
              </span>
              <span className="status-summary-label">Retention rate</span>
            </div>
          </div>

          <section className="ws-section">
            <div className="ws-section-head">
              <h2>Outcome Mix</h2>
            </div>
            <div className="ws-list">
              <div className="ws-row">
                <div className="ws-row-main">
                  <span className="ws-row-title">Self-employed</span>
                </div>
                <span className="mono">{data.self_employed}</span>
              </div>
              <div className="ws-row">
                <div className="ws-row-main">
                  <span className="ws-row-title">Apprenticeships</span>
                </div>
                <span className="mono">{data.apprenticeships}</span>
              </div>
              <div className="ws-row">
                <div className="ws-row-main">
                  <span className="ws-row-title">Average wage (verified placements with wage data)</span>
                </div>
                <span className="mono">{data.avg_wage ? `₹${data.avg_wage}/mo` : '—'}</span>
              </div>
            </div>
          </section>

          <section className="ws-section">
            <div className="ws-section-head">
              <h2>By Course</h2>
            </div>
            {data.by_course.length === 0 ? (
              <p className="ws-empty">No training data yet.</p>
            ) : (
              <div className="ws-list">
                {data.by_course.map((c) => (
                  <div className="ws-row" key={c.course_name}>
                    <div className="ws-row-main">
                      <span className="ws-row-title">{c.course_name}</span>
                      <span className="ws-row-meta mono">
                        {c.placements} of {c.trainings} placed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="ws-section">
            <div className="ws-section-head">
              <h2>By District</h2>
            </div>
            {data.by_district.length === 0 ? (
              <p className="ws-empty">No district data yet.</p>
            ) : (
              <div className="ws-list">
                {data.by_district.map((d) => (
                  <div className="ws-row" key={d.district}>
                    <div className="ws-row-main">
                      <span className="ws-row-title">{d.district}</span>
                      <span className="ws-row-meta mono">
                        {d.placements} of {d.trainings} placed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="ws-section">
            <div className="ws-section-head">
              <h2>Non-Placement Reasons</h2>
            </div>
            <p className="ws-hint">Keyword-clustered from free-text reasons logged by learners — rule-based, not a trained model.</p>
            {reasonClusters.length === 0 ? (
              <p className="ws-empty">No reasons logged yet.</p>
            ) : (
              <div className="ws-list">
                {reasonClusters.map((c) => (
                  <div className="ws-row" key={c.label}>
                    <div className="ws-row-main">
                      <span className="ws-row-title">{c.label}</span>
                      <span className="ws-row-meta">{c.examples.join(' • ')}</span>
                    </div>
                    <span className="mono">{c.count}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {data.total_trainings < 10 && (
            <p className="ws-hint">
              Sample size is small right now ({data.total_trainings} trainings) — treat these percentages as
              directional, not statistically reliable, until more real records are added.
            </p>
          )}
        </>
      )}
    </div>
  )
}
