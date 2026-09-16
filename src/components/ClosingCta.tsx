import Reveal from './Reveal'

export default function ClosingCta() {
  return (
    <section className="wrap" id="contact">
      <Reveal className="closing">
        <span className="eyebrow eyebrow-accent">Get In Touch</span>
        <h2>Ready to see it in action?</h2>
        <p>Built by Team HACKLOOP for Smart India Hackathon 2026.</p>
        <a className="btn btn-primary" href="mailto:hello@proficia.app">
          Get In Touch
        </a>
      </Reveal>
    </section>
  )
}
