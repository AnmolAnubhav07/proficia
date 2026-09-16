import { audiences } from '../data/content'
import Reveal from './Reveal'

export default function Audience() {
  return (
    <section className="wrap" id="journeys">
      <Reveal>
        <span className="eyebrow">Who It's For</span>
        <h2 className="section-title-md">One dataset, read differently by every stakeholder.</h2>
        <p className="audience-intro">
          Cohort, course, provider, district and demographic analytics — filtered to what each
          stakeholder actually needs, from a learner's own record to a funder's case for continued
          investment.
        </p>
      </Reveal>
      <div className="audience-grid">
        {audiences.map((item, i) => (
          <Reveal key={item.title} delay={i * 70} className="audience-card">
            <div className="audience-icon">
              <item.icon width={18} height={18} />
            </div>
            <div className="audience-title">{item.title}</div>
            <p className="audience-desc">{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
