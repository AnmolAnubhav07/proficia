import { testimonials } from '../data/content'
import Reveal from './Reveal'

export default function Testimonials() {
  return (
    <section className="wrap">
      <Reveal>
        <span className="eyebrow">What Each Side Would Say</span>
        <h2 className="section-title-md">Written as illustrative scenarios, not real quotes.</h2>
      </Reveal>
      <div className="testimonial-grid">
        {testimonials.map((t, i) => (
          <Reveal key={t.role} delay={i * 70} className="testimonial-card">
            <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="testimonial-role">{t.role}</div>
            <div className="testimonial-scenario mono">{t.scenario}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
