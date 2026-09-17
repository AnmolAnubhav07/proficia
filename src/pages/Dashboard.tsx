import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { buildItems, type BuildStatus } from '../data/content'
import AnalyticsDashboard from './dashboards/AnalyticsDashboard'
import EmployerDashboard from './dashboards/EmployerDashboard'
import LearnerDashboard from './dashboards/LearnerDashboard'
import ProviderDashboard from './dashboards/ProviderDashboard'
import { useAuth } from '../lib/AuthContext'
import { supabase } from '../lib/supabaseClient'

const roleLabels: Record<string, string> = {
  learner: 'Learner',
  training_provider: 'Training Provider',
  employer: 'Employer',
  policymaker: 'Policymaker',
  funder: 'Funder',
}

const statusLabels: Record<BuildStatus, string> = {
  done: 'Implemented',
  partial: 'Partial',
  planned: 'Not Yet Built',
}

type Tab = 'workspace' | 'status'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('workspace')

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [loading, user, navigate])

  const counts = useMemo(() => {
    const c = { done: 0, partial: 0, planned: 0 }
    buildItems.forEach((item) => c[item.status]++)
    return c
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading || !user) {
    return (
      <div className="auth-page">
        <p className="auth-sub">Loading…</p>
      </div>
    )
  }

  const role = (user.user_metadata?.role as string) || 'learner'
  const fullName = (user.user_metadata?.full_name as string) || user.email

  return (
    <div className="dashboard-page">
      <div className="wrap dashboard-topbar">
        <Link to="/" className="wordmark">
          PROFICI<span>A</span>
        </Link>
        <div className="dashboard-topbar-right">
          <span className="pill">{roleLabels[role] ?? role}</span>
          <button className="btn btn-outline" type="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>

      <div className="wrap dashboard-main">
        <h1>Welcome, {fullName}</h1>
        <p className="auth-sub">
          Signed in as <strong>{user.email}</strong>.
        </p>

        <div className="mode-toggle dashboard-tabs">
          <button
            type="button"
            className={`mode-toggle-btn ${tab === 'workspace' ? 'mode-toggle-btn-active' : ''}`}
            onClick={() => setTab('workspace')}
          >
            My Workspace
          </button>
          <button
            type="button"
            className={`mode-toggle-btn ${tab === 'status' ? 'mode-toggle-btn-active' : ''}`}
            onClick={() => setTab('status')}
          >
            Platform Status
          </button>
        </div>

        {tab === 'workspace' ? (
          <div className="dashboard-workspace">
            {role === 'learner' && <LearnerDashboard userId={user.id} />}
            {role === 'training_provider' && <ProviderDashboard userId={user.id} />}
            {role === 'employer' && <EmployerDashboard />}
            {(role === 'policymaker' || role === 'funder') && <AnalyticsDashboard role={role} />}
          </div>
        ) : (
          <>
            <div className="status-summary">
              <div className="status-summary-item">
                <span className="status-summary-value mono status-done-text">{counts.done}</span>
                <span className="status-summary-label">Implemented</span>
              </div>
              <div className="status-summary-item">
                <span className="status-summary-value mono status-partial-text">{counts.partial}</span>
                <span className="status-summary-label">Partial</span>
              </div>
              <div className="status-summary-item">
                <span className="status-summary-value mono status-planned-text">{counts.planned}</span>
                <span className="status-summary-label">Not Yet Built</span>
              </div>
            </div>

            <div className="status-grid">
              {buildItems.map((item) => (
                <div className="status-card" key={item.title}>
                  <div className="status-card-head">
                    <span className="status-card-title">{item.title}</span>
                    <span className={`status-badge status-badge-${item.status}`}>{statusLabels[item.status]}</span>
                  </div>
                  <p className="status-card-note">{item.note}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
