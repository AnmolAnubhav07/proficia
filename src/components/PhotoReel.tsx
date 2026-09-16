import { useEffect, useState } from 'react'
import { heroSlides } from '../data/content'

export default function PhotoReel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hero-reel">
      <div className="hero-reel-chrome">
        <div className="hv-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="hero-reel-title mono">OUTCOMES IN THE FIELD</span>
      </div>

      <div className="photo-reel-stage">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.caption}
            className={`photo-reel-img ${i === index ? 'photo-reel-img-active' : ''}`}
          >
            <slide.Illustration />
          </div>
        ))}

        <div className="photo-reel-caption mono">{heroSlides[index].caption}</div>

        <div className="photo-reel-dots">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.caption}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              className={`photo-reel-dot ${i === index ? 'photo-reel-dot-active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
