import { benchmarkMetrics } from '../data/content'
import Reveal from './Reveal'

export default function BenchmarkMetrics() {
  return (
    <div className="benchmark-strip">
      <div className="wrap">
        <span className="eyebrow eyebrow-center benchmark-eyebrow">
          Demonstration Dataset · Not Live Production Numbers
        </span>
        <div className="benchmark-grid">
          {benchmarkMetrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 60} className="benchmark-card">
              <div className="benchmark-value mono">{m.value}</div>
              <div className="benchmark-label">{m.label}</div>
              <div className="benchmark-detail">{m.detail}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
