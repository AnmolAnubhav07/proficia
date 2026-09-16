import type { SVGProps } from 'react'

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function BriefcaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  )
}

export function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="12" rx="3" />
      <path d="M9 17l-3 4v-4" />
    </svg>
  )
}

export function LayersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <polygon points="12,3 21,8 12,13 3,8" />
      <polyline points="3,13 12,18 21,13" />
      <polyline points="3,17.5 12,22.5 21,17.5" />
    </svg>
  )
}

export function TrendingUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <polyline points="3,17 9,11 13,15 21,6" />
      <polyline points="15,6 21,6 21,12" />
    </svg>
  )
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="10" r="6" />
      <line x1="21" y1="21" x2="15" y2="15" />
    </svg>
  )
}

export function GraduationCapIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l10 5-10 5L2 8l10-5z" />
      <path d="M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    </svg>
  )
}

export function BuildingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <line x1="8" y1="8" x2="8" y2="8" />
      <line x1="12" y1="8" x2="12" y2="8" />
      <line x1="16" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="8" y2="12" />
      <line x1="12" y1="12" x2="12" y2="12" />
      <line x1="16" y1="12" x2="16" y2="12" />
      <line x1="9" y1="21" x2="9" y2="16" />
      <line x1="15" y1="21" x2="15" y2="16" />
    </svg>
  )
}

export function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.2 20c.3-2 1.8-3.5 4-4" />
    </svg>
  )
}

export function LandmarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <line x1="4" y1="21" x2="20" y2="21" />
      <line x1="5" y1="10" x2="5" y2="21" />
      <line x1="9" y1="10" x2="9" y2="21" />
      <line x1="15" y1="10" x2="15" y2="21" />
      <line x1="19" y1="10" x2="19" y2="21" />
      <polygon points="12,3 21,9 3,9" />
    </svg>
  )
}

export function WalletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="17" cy="14" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} strokeWidth={2.4} {...props}>
      <polyline points="4,12 9,17 20,6" />
    </svg>
  )
}
