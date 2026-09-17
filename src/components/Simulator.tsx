import { useState } from 'react'
import { vocations } from '../data/content'
import { CheckIcon } from './icons'
import Reveal from './Reveal'

export default function Simulator() {
  const [index, setIndex] = useState(0)
  const vocation = vocations[index]

  return (
    <section className="wrap">
      <Reveal>
        <span className="eyebrow">Try It</span>
        <h2 className="section-title-md">See a readiness score before a trainee finishes.</h2>
        <p className="audience-intro">
          Pick a vocation to simulate the kind of readiness diagnostic Proficia runs against a
          trainee's profile — detected gap, prescribed bridge module and post-placement wage
          trajectory.
        </p>
      </Reveal>

      <Reveal className="simulator">
        <div className="simulator-picker">
          {vocations.map((v, i) => (
            <button
              key={v.code}
              type="button"
              className={`simulator-chip ${i === index ? 'simulator-chip-active' : ''}`}
              onClick={() => setIndex(i)}
            >
              {v.title}
            </button>
          ))}
        </div>

        <div className="simulator-panel">
          <div className="simulator-head">
            <span className="simulator-code mono">
              {vocation.code} · {vocation.level}
            </span>
            <span className="simulator-readiness-tag mono">
              <CheckIcon width={13} height={13} />
              Simulated
            </span>
          </div>

          <div className="simulator-body">
            <div className="simulator-score">
              <span className="simulator-score-value mono">{vocation.readiness}%</span>
              <span className="simulator-score-label mono">Readiness score</span>
            </div>

            <div className="simulator-fields">
              <div className="simulator-field">
                <span className="sample-field-label mono">Detected Gap</span>
                <span className="sample-field-value">{vocation.gap}</span>
              </div>
              <div className="simulator-field">
                <span className="sample-field-label mono">Prescribed Bridge</span>
                <span className="sample-field-value">{vocation.bridge}</span>
              </div>
              <div className="simulator-field">
                <span className="sample-field-label mono">Baseline Placement</span>
                <span className="sample-field-value">{vocation.baselineWage}</span>
              </div>
              <div className="simulator-field">
                <span className="sample-field-label mono">6M Retention Wage</span>
                <span className="sample-field-value simulator-wage-up">{vocation.retainedWage}</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
