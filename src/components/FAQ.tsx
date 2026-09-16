import { useState } from 'react'
import { faqs } from '../data/content'
import Reveal from './Reveal'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="wrap" id="faq">
      <Reveal>
        <span className="eyebrow">Edge Cases, Answered</span>
        <h2 className="section-title-md">What happens when things don't go as planned?</h2>
      </Reveal>
      <div className="faq-list">
        {faqs.map((item, i) => {
          const open = openIndex === i
          return (
            <Reveal key={item.question} delay={i * 30} className="faq-item">
              <button
                type="button"
                className="faq-question"
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <span>{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  {open ? '−' : '+'}
                </span>
              </button>
              <div className={`faq-panel ${open ? 'faq-panel-open' : ''}`} id={`faq-panel-${i}`}>
                <div className="faq-panel-inner">
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
