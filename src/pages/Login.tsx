import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordField from '../components/PasswordField'
import { demoAccounts, demoPassword } from '../data/content'
import { supabase } from '../lib/supabaseClient'

type Mode = 'email' | 'phone'

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<string | null>(null)

  async function signIn(loginEmail: string, loginPassword: string, key: string) {
    setError(null)
    setLoading(key)

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    })

    setLoading(null)
    if (error) {
      setError(error.message)
      return
    }
    navigate('/dashboard')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (mode === 'email') {
      signIn(email, password, 'form')
      return
    }

    setError(null)
    setLoading('form')

    const { data: resolvedEmail, error: lookupError } = await supabase.rpc('get_email_by_phone', {
      p_phone: phone,
    })

    if (lookupError || !resolvedEmail) {
      setLoading(null)
      setError('No account found with this phone number.')
      return
    }

    signIn(resolvedEmail, password, 'form')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="wordmark">
          PROFICI<span>A</span>
        </Link>
        <h1>Welcome back</h1>
        <p className="auth-sub">Log in to your Proficia account.</p>

        <div className="mode-toggle">
          <button
            type="button"
            className={`mode-toggle-btn ${mode === 'email' ? 'mode-toggle-btn-active' : ''}`}
            onClick={() => {
              setMode('email')
              setError(null)
            }}
          >
            Email
          </button>
          <button
            type="button"
            className={`mode-toggle-btn ${mode === 'phone' ? 'mode-toggle-btn-active' : ''}`}
            onClick={() => {
              setMode('phone')
              setError(null)
            }}
          >
            Phone
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'email' ? (
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          ) : (
            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
          )}

          <PasswordField
            id="password"
            label="Password"
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
          />

          {error && <p className="field-error">{error}</p>}

          <button className="btn btn-primary auth-submit" type="submit" disabled={loading !== null}>
            {loading === 'form' ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <div className="demo-block">
          <span className="demo-label mono">Demo Access · One Click</span>
          <div className="demo-grid">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                type="button"
                className="demo-chip"
                disabled={loading !== null}
                onClick={() => signIn(acc.email, demoPassword, acc.role)}
              >
                {loading === acc.role ? '…' : acc.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
