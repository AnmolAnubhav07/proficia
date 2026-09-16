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
          <a className="btn btn-login" href="#login">
            Login
          </a>
          <a className="btn btn-primary" href="#contact">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  )
}
