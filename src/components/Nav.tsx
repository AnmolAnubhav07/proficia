import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <div className="wordmark">
          PROFICI<span>A</span>
        </div>
        <div className="nav-links">
          <a href="#platform">Platform</a>
          <a href="#features">Features</a>
          <a href="#journeys">Journeys</a>
          <a href="#about">About</a>
          <Link className="btn btn-login" to="/login">
            Login
          </Link>
          <Link className="btn btn-primary" to="/signup">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}
