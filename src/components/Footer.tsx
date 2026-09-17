import { complianceLine, footerColumns, techStack } from '../data/content'

export default function Footer() {
  return (
    <footer className="wrap" id="about">
      <div className="footer-top">
        <div className="wordmark">
          PROFICI<span>A</span>
        </div>
        <div className="footer-links">
          <a href="#platform">Platform</a>
          <a href="#features">Features</a>
          <a href="#journeys">Journeys</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </div>

      <div className="footer-sitemap">
        {footerColumns.map((col) => (
          <div className="footer-col" key={col.title}>
            <span className="footer-col-title mono">{col.title}</span>
            <ul className="footer-col-list">
              {col.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-compliance mono">{complianceLine}</div>
      <div className="footer-bottom">
        <span className="mono">{techStack}</span>
        <span className="mono">© 2026 Proficia · Team HACKLOOP · SIH 2026</span>
      </div>
    </footer>
  )
}
