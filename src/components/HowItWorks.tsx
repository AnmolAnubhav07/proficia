import { Fragment } from 'react'
import { pipeline } from '../data/content'
import Reveal from './Reveal'

export default function HowItWorks() {
  return (
    <section className="wrap">
      <Reveal>
        <span className="eyebrow">How It Works</span>
        <h2 className="section-title-md">From first record to a verified outcome.</h2>
      </Reveal>
      <div className="pipeline">
        {pipeline.map((stage, i) => (
          <Fragment key={stage.tag}>
            {i > 0 && <div className="pipeline-arrow">→</div>}
            <Reveal delay={i * 80} className="pipeline-stage">
              <div className="feature-tag">
                <stage.icon width={18} height={18} />
              </div>
              <span className="pipeline-tag mono">{stage.tag}</span>
              <div className="pipeline-title">{stage.title}</div>
              <p className="pipeline-desc">{stage.description}</p>
            </Reveal>
          </Fragment>
        ))}
      </div>
    </section>
  )
}
