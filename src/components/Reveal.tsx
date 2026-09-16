import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined

  return (
    <div ref={ref} className={`reveal ${inView ? 'reveal-in' : ''} ${className}`.trim()} style={style}>
      {children}
    </div>
  )
}
