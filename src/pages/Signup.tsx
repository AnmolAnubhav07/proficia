import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordField from '../components/PasswordField'
import { roleDetailFields, signupRoles } from '../data/content'
import { supabase } from '../lib/supabaseClient'

export default function Signup() {
  const navigate = useNavigate()
  const [role, setRole] = useState(signupRoles[0].role)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [details, setDetails] = useState<Record<string, string>>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)

  const fields = roleDetailFields[role] ?? []

  function updateDetail(id: string, value: string) {
    setDetails((d) => ({ ...d, [id]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          role,
          details,
        },
      },
    })

    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }

    if (data.session) {
      navigate('/dashboard')
    } else {
      setCheckEmail(true)
    }
  }

  if (checkEmail) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <Link to="/" className="wordmark">
            PROFICI<span>A</span>
          </Link>
          <h1>Check your inbox</h1>
          <p className="auth-sub">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your
            account, then log in.
          </p>
          <Link className="btn btn-primary auth-submit" to="/login">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-wide">
        <Link to="/" className="wordmark">
          PROFICI<span>A</span>
        </Link>
        <h1>Create your account</h1>
        <p className="auth-sub">Start tracking outcomes with Proficia.</p>

        <div className="role-select">
          {signupRoles.map((r) => (
            <button
              key={r.role}
              type="button"
              className={`role-card ${role === r.role ? 'role-card-active' : ''}`}
              onClick={() => setRole(r.role)}
            >
              <span className="role-card-title">{r.label}</span>
              <span className="role-card-desc">{r.description}</span>
            </button>
          ))}
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
              />
            </div>
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
          </div>

          <div className="field-row">
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
            <PasswordField
              id="password"
              label="Password"
              autoComplete="new-password"
              minLength={6}
              value={password}
              onChange={setPassword}
              placeholder="At least 6 characters"
            />
          </div>

          {fields.length > 0 && (
            <>
              <span className="field-group-label mono">{signupRoles.find((r) => r.role === role)?.label} details</span>
              <div className="field-row field-row-wrap">
                {fields.map((f) => (
                  <div className="field" key={f.id}>
                    <label htmlFor={f.id}>{f.label}</label>
                    <input
                      id={f.id}
                      type={f.type}
                      required
                      value={details[f.id] ?? ''}
                      onChange={(e) => updateDetail(f.id, e.target.value)}
                      placeholder={f.placeholder}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {error && <p className="field-error">{error}</p>}

          <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Get Started'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}
