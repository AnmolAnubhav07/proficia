import { problemSolutions } from '../data/content'
import Reveal from './Reveal'

export default function ProblemSolution() {
  return (
    <section className="wrap" id="features">
      <Reveal>
        <span className="eyebrow">Problem → Solution</span>
        <h2 className="section-title-md">Every gap in outcome tracking, mapped to a fix.</h2>
      </Reveal>
      <div className="ps-grid">
        {problemSolutions.map((item, i) => (
          <Reveal key={item.tag} delay={i * 70} className="ps-card">
            <div className="ps-top">
              <div className="feature-tag">
                <item.icon width={18} height={18} />
              </div>
              <span className="ps-tag mono">{item.tag}</span>
            </div>
            <div className="ps-row">
              <span className="ps-label mono">Problem</span>
              <p className="ps-problem">{item.problem}</p>
            </div>
            <div className="ps-row">
              <span className="ps-label ps-label-accent mono">Solution</span>
              <p className="ps-solution">{item.solution}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
