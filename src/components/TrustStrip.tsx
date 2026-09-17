import { standards } from '../data/content'

export default function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="wrap trust-strip-inner">
        {standards.map((s) => (
          <span className="trust-item mono" key={s}>
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
