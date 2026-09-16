import type { ReactNode } from 'react'

const FONT = "'Public Sans', sans-serif"
const MONO = "'IBM Plex Mono', monospace"

function Panel({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
      <rect width="600" height="400" fill="var(--surface)" />
      {children}
    </svg>
  )
}

export function JourneyIllustration() {
  return (
    <Panel>
      <path
        d="M40,300 C150,300 150,180 260,180 C370,180 370,300 480,300 C520,300 540,260 560,220"
        fill="none"
        stroke="var(--line)"
        strokeWidth="4"
        strokeDasharray="2 14"
        strokeLinecap="round"
      />
      {/* node 1: training (book) */}
      <circle cx="40" cy="300" r="26" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <rect x="27" y="290" width="26" height="18" rx="2" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <line x1="40" y1="290" x2="40" y2="308" stroke="var(--accent)" strokeWidth="2" />

      {/* node 2: certification (ribbon) */}
      <circle cx="260" cy="180" r="26" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <circle cx="260" cy="172" r="10" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <path d="M253,180 L248,196 L260,190 L272,196 L267,180" fill="var(--accent)" opacity="0.5" />

      {/* node 3: placement (briefcase) */}
      <circle cx="480" cy="300" r="26" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <rect x="466" y="292" width="28" height="18" rx="3" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <path d="M474,292 v-5 a6,6 0 0 1 12,0 v5" fill="none" stroke="var(--accent)" strokeWidth="2" />

      {/* node 4: employment (growth) */}
      <circle cx="560" cy="220" r="26" fill="var(--accent)" />
      <polyline
        points="548,228 555,214 562,222 572,206"
        fill="none"
        stroke="var(--accent-fg)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* sparkles near final node */}
      <circle cx="590" cy="190" r="3" fill="var(--accent)" />
      <circle cx="575" cy="170" r="2" fill="var(--accent)" />

      {/* walking figure between node 3 and 4 */}
      <g transform="translate(510,250)">
        <circle cx="0" cy="-30" r="9" fill="var(--fg)" />
        <path d="M0,-21 L0,4 M0,-14 L-11,-2 M0,-14 L11,-6 M0,4 L-8,20 M0,4 L9,19" stroke="var(--fg)" strokeWidth="4" strokeLinecap="round" />
      </g>

      <text x="40" y="345" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--muted)">TRAINING</text>
      <text x="260" y="225" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--muted)">CERTIFIED</text>
      <text x="480" y="345" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--muted)">PLACED</text>
      <text x="560" y="265" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--accent)">EMPLOYED</text>
    </Panel>
  )
}

export function FollowUpIllustration() {
  return (
    <Panel>
      {/* phone */}
      <rect x="230" y="60" width="140" height="280" rx="22" fill="var(--bg)" stroke="var(--line)" strokeWidth="3" />
      <rect x="246" y="84" width="108" height="196" rx="4" fill="var(--accent-soft)" />
      <rect x="266" y="324" width="68" height="6" rx="3" fill="var(--line)" />

      <text x="300" y="106" textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize="13" fill="var(--accent)">
        Your progress
      </text>
      <text x="300" y="122" textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize="13" fill="var(--accent)">
        matters!
      </text>

      {/* chat rows inside screen */}
      <rect x="260" y="142" width="80" height="22" rx="8" fill="var(--surface)" />
      <rect x="260" y="172" width="64" height="22" rx="8" fill="var(--surface)" />
      <rect x="260" y="202" width="72" height="22" rx="8" fill="var(--surface)" />

      {/* floating notification bubbles */}
      <circle cx="140" cy="120" r="30" fill="#25D366" opacity="0.15" />
      <circle cx="140" cy="120" r="20" fill="#25D366" />
      <path d="M132,120 a8,8 0 1 1 12,7 l3,6 -7,-2 a8,8 0 0 1 -8,-11" fill="var(--accent-fg)" />

      <circle cx="470" cy="130" r="26" fill="var(--accent-soft)" />
      <rect x="458" y="121" width="24" height="17" rx="2" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <polyline points="458,121 470,132 482,121" fill="none" stroke="var(--accent)" strokeWidth="2" />

      <circle cx="120" cy="260" r="24" fill="var(--accent)" />
      <path
        d="M110,252 q0,-6 6,-6 h8 q6,0 6,6 v8 q0,6 -6,6 h-4 l-6,5 v-5 q-4,0 -4,-6 z"
        fill="var(--accent-fg)"
      />

      <circle cx="480" cy="270" r="22" fill="var(--fg)" />
      <path
        d="M470,262 q3,-4 6,-1 l3,4 q1,2 -1,3 q-1,4 3,8 q4,4 8,3 q2,-2 3,-1 l4,3 q3,3 -1,6 q-6,4 -13,-3 q-9,-9 -12,-16 q-1,-3 0,-6z"
        fill="var(--bg)"
      />
    </Panel>
  )
}

export function PlacementIllustration() {
  return (
    <Panel>
      {/* left figure (trainee) */}
      <g transform="translate(190,230)">
        <circle cx="0" cy="-48" r="16" fill="var(--fg)" />
        <path d="M-22,10 Q-22,-34 0,-34 Q22,-34 22,10 Z" fill="var(--accent)" />
      </g>
      {/* right figure (employer) */}
      <g transform="translate(320,230)">
        <circle cx="0" cy="-48" r="16" fill="var(--fg)" />
        <path d="M-22,10 Q-22,-34 0,-34 Q22,-34 22,10 Z" fill="var(--fg)" opacity="0.85" />
      </g>
      {/* handshake */}
      <rect x="242" y="186" width="26" height="12" rx="6" fill="var(--accent-fg)" stroke="var(--fg)" strokeWidth="2" />

      {/* floating verified card */}
      <rect x="360" y="70" width="200" height="180" rx="14" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
      <circle cx="384" cy="98" r="9" fill="var(--accent)" />
      <path d="M380,98 l3,4 l6,-8" fill="none" stroke="var(--accent-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="400" y="102" fontFamily={FONT} fontWeight="700" fontSize="14" fill="var(--fg)">
        Employer Verified
      </text>
      <line x1="378" y1="116" x2="546" y2="116" stroke="var(--line)" strokeWidth="1.5" />

      {(
        [
          ['Company', 'Nexora Systems'],
          ['Job Role', 'Junior Engineer'],
          ['Joining Date', '14 Jul 2026'],
          ['Salary Range', '₹18k – 22k/mo'],
          ['Status', 'Active'],
        ] as const
      ).map(([label, value], i) => (
        <g key={label} transform={`translate(378, ${132 + i * 23})`}>
          <rect x="0" y="0" width="14" height="14" rx="4" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          <path d="M3,7 l3,3 l6,-7" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="22" y="11" fontFamily={MONO} fontSize="10.5" fill="var(--muted)">
            {label}
          </text>
          <text x="168" y="11" textAnchor="end" fontFamily={MONO} fontSize="10.5" fill="var(--fg)">
            {value}
          </text>
        </g>
      ))}
    </Panel>
  )
}

export function DashboardIllustration() {
  const bars = [40, 70, 55, 90, 65]
  const stats: [string, string][] = [
    ['Total Trainees', '12,480'],
    ['Placed', '8,214'],
    ['Self-Employed', '1,905'],
    ['Retention', '86%'],
  ]
  return (
    <Panel>
      <rect x="40" y="50" width="520" height="300" rx="14" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
      <rect x="40" y="50" width="520" height="34" rx="14" fill="var(--surface)" />
      <circle cx="60" cy="67" r="4" fill="var(--line)" />
      <circle cx="74" cy="67" r="4" fill="var(--line)" />
      <circle cx="88" cy="67" r="4" fill="var(--line)" />

      {stats.map(([label, value], i) => (
        <g key={label} transform={`translate(${58 + i * 128}, 100)`}>
          <rect width="112" height="60" rx="10" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
          <text x="12" y="24" fontFamily={MONO} fontSize="16" fontWeight="700" fill="var(--accent)">
            {value}
          </text>
          <text x="12" y="42" fontFamily={FONT} fontSize="9.5" fill="var(--muted)">
            {label}
          </text>
        </g>
      ))}

      {/* bar chart */}
      <g transform="translate(58,300)">
        {bars.map((h, i) => (
          <rect key={i} x={i * 34} y={-h} width="22" height={h} rx="3" fill="var(--accent)" opacity={0.55 + i * 0.09} />
        ))}
      </g>

      {/* pie chart */}
      <g transform="translate(430,240)">
        <circle r="40" fill="var(--accent-soft)" />
        <circle
          r="40"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="40"
          strokeDasharray="150.8 251.3"
          transform="rotate(-90)"
        />
        <circle
          r="40"
          fill="none"
          stroke="var(--fg)"
          strokeWidth="40"
          strokeDasharray="50 251.3"
          strokeDashoffset="-150.8"
          transform="rotate(-90)"
          opacity="0.75"
        />
      </g>

      {/* simplified district map */}
      <g transform="translate(230,190)">
        <path
          d="M60,0 L100,20 L96,70 L70,110 L40,108 L10,80 L0,40 L24,10 Z"
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeWidth="2"
        />
        <circle cx="45" cy="40" r="4" fill="var(--accent)" />
        <circle cx="65" cy="55" r="3" fill="var(--accent)" />
        <circle cx="35" cy="70" r="3.5" fill="var(--accent)" />
        <circle cx="70" cy="30" r="3" fill="var(--accent)" />
      </g>
    </Panel>
  )
}

export function SkillGapIllustration() {
  const groups: [string, number, number][] = [
    ['AI/ML', 92, 34],
    ['Cloud', 80, 42],
    ['Certifications', 70, 50],
  ]
  return (
    <Panel>
      <text x="300" y="56" textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize="15" fill="var(--fg)">
        Demand vs. Trainee Skills
      </text>

      {groups.map(([label, demand, skill], i) => {
        const x = 110 + i * 150
        return (
          <g key={label}>
            <rect x={x} y={260 - demand} width="34" height={demand} rx="4" fill="var(--accent)" />
            <rect x={x + 42} y={260 - skill} width="34" height={skill} rx="4" fill="var(--line)" />
            <line
              x1={x - 6}
              y1={260 - demand}
              x2={x + 82}
              y2={260 - demand}
              stroke="var(--fg)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.5"
            />
            <text x={x + 38} y="284" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--muted)">
              {label}
            </text>
            <text x={x + 38} y="300" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="var(--accent)">
              GAP
            </text>
          </g>
        )
      })}

      <rect x="90" y="330" width="420" height="1" fill="var(--line)" />
      <text x="300" y="358" textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize="14" fill="var(--accent)">
        Targeted Training for a Better Future
      </text>
    </Panel>
  )
}

export function LivelihoodsIllustration() {
  const cards: [number, string][] = [
    [40, 'Entrepreneurship'],
    [230, 'Apprenticeship'],
    [420, 'Freelancing'],
  ]
  return (
    <Panel>
      {cards.map(([x, label]) => (
        <rect key={label} x={x} y="46" width="150" height="230" rx="14" fill="var(--bg)" stroke="var(--line)" strokeWidth="1.5" />
      ))}

      {/* entrepreneur: shop counter with laptop */}
      <g transform="translate(40,46)">
        <circle cx="75" cy="70" r="16" fill="var(--fg)" />
        <path d="M52,140 Q52,96 75,96 Q98,96 98,140 Z" fill="var(--accent)" />
        <rect x="45" y="150" width="60" height="14" rx="3" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
        <rect x="58" y="132" width="34" height="20" rx="2" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
      </g>

      {/* apprentice/technician at workbench */}
      <g transform="translate(230,46)">
        <circle cx="75" cy="70" r="16" fill="var(--fg)" />
        <path d="M52,140 Q52,96 75,96 Q98,96 98,140 Z" fill="var(--fg)" opacity="0.85" />
        <rect x="45" y="150" width="60" height="10" rx="2" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
        <rect x="66" y="118" width="8" height="30" rx="3" fill="var(--accent)" transform="rotate(30 70 133)" />
      </g>

      {/* freelancer at home laptop */}
      <g transform="translate(420,46)">
        <circle cx="75" cy="70" r="16" fill="var(--fg)" />
        <path d="M52,140 Q52,96 75,96 Q98,96 98,140 Z" fill="var(--accent)" opacity="0.7" />
        <rect x="55" y="140" width="40" height="24" rx="2" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
        <rect x="60" y="122" width="30" height="18" rx="2" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
      </g>

      {cards.map(([x], i) => (
        <text
          key={i}
          x={x + 75}
          y="196"
          textAnchor="middle"
          fontFamily={MONO}
          fontSize="10.5"
          fill="var(--muted)"
        >
          {['Small business', 'Skilled trade', 'Remote work'][i]}
        </text>
      ))}

      {/* chip row */}
      {['Self-Employed', 'Apprenticeship', 'Freelancing', 'Entrepreneurship'].map((chip, i) => (
        <g key={chip} transform={`translate(${40 + i * 132}, 314)`}>
          <rect width="120" height="28" rx="14" fill="var(--accent-soft)" />
          <text x="60" y="18" textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill="var(--accent)">
            {chip}
          </text>
        </g>
      ))}
    </Panel>
  )
}
