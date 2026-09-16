import { sampleRecord } from '../data/content'
import { CheckIcon } from './icons'
import Reveal from './Reveal'

export default function SampleRecord() {
  return (
    <section className="wrap">
      <Reveal className="sample-card">
        <div className="sample-head">
          <div>
            <span className="eyebrow" style={{ marginBottom: 4 }}>
              See It In Practice
            </span>
            <div className="sample-id mono">{sampleRecord.id}</div>
          </div>
          {sampleRecord.verified && (
            <span className="sample-verified mono">
              <CheckIcon width={13} height={13} />
              Verified
            </span>
          )}
        </div>

        <div className="sample-body">
          <div className="sample-field">
            <span className="sample-field-label mono">Course</span>
            <span className="sample-field-value">{sampleRecord.course}</span>
          </div>
          <div className="sample-field">
            <span className="sample-field-label mono">Status</span>
            <span className="sample-field-value">{sampleRecord.status}</span>
          </div>
          <div className="sample-field">
            <span className="sample-field-label mono">Wage</span>
            <span className="sample-field-value">
              {sampleRecord.wage}
              <span className="sample-wage-delta"> · {sampleRecord.wageDelta}</span>
            </span>
          </div>
        </div>

        <div className="sample-footnote">{sampleRecord.label}</div>
      </Reveal>
    </section>
  )
}
