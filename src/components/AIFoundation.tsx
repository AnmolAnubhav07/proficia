import { aiCapabilities } from '../data/content'
import Reveal from './Reveal'

export default function AIFoundation() {
  return (
    <section className="wrap">
      <Reveal>
        <span className="eyebrow">AI Foundation</span>
        <h2 className="section-title-md">The intelligence layer under the numbers.</h2>
      </Reveal>
      <div className="ai-grid">
        {aiCapabilities.map((item, i) => (
          <Reveal key={item.title} delay={i * 80} className="ai-card">
            <div className="feature-tag">
              <item.icon width={18} height={18} />
            </div>
            <div className="ai-title">{item.title}</div>
            <p className="ai-desc">{item.description}</p>
            <code className="ai-snippet mono">{item.snippet}</code>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
