import type { CSSProperties } from 'react'
import { badges } from '../data/content'
import PhotoReel from './PhotoReel'

const delay = (ms: number): CSSProperties => ({ '--d': `${ms}ms` }) as CSSProperties

export default function Hero() {
  return (
    <header className="hero wrap" id="platform">
      <div className="badges hero-anim" style={delay(0)}>
        {badges.map((badge) => (
          <span className="pill" key={badge}>
            {badge}
          </span>
        ))}
      </div>
      <h1 className="hero-anim" style={delay(80)}>
        PROVE WHAT TRAINING
        <br />
        ACTUALLY CHANGES.
      </h1>
      <p className="hero-sub hero-anim" style={delay(160)}>
        Proficia is a longitudinal skilling-outcomes and impact-measurement platform — tracking
        employment, self-employment, retention, wage growth and course relevance long after
        certification ends.
      </p>
      <div className="hero-ctas hero-anim" style={delay(240)}>
        <a className="btn btn-primary" href="#features">
          See The Platform
        </a>
        <a className="btn btn-outline" href="#journeys">
          Who It's For ↓
        </a>
      </div>
      <div className="hero-anim" style={delay(320)}>
        <PhotoReel />
      </div>
    </header>
  )
}
