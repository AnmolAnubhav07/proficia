import type { ComponentType, SVGProps } from 'react'
import {
  BriefcaseIcon,
  BuildingIcon,
  ChatIcon,
  GraduationCapIcon,
  LandmarkIcon,
  LayersIcon,
  SearchIcon,
  ShieldIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon,
} from '../components/icons'
import {
  DashboardIllustration,
  FollowUpIllustration,
  JourneyIllustration,
  LivelihoodsIllustration,
  PlacementIllustration,
  SkillGapIllustration,
} from '../components/illustrations'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

export interface ProblemSolution {
  tag: string
  icon: Icon
  problem: string
  solution: string
}

export interface PipelineStage {
  tag: string
  icon: Icon
  title: string
  description: string
}

export interface Audience {
  icon: Icon
  title: string
  description: string
}

export interface Faq {
  question: string
  answer: string
}

export const badges = ['SIH 2026', 'PS 26135', 'HACKLOOP']

export interface HeroSlide {
  Illustration: ComponentType
  caption: string
}

export const heroSlides: HeroSlide[] = [
  { Illustration: JourneyIllustration, caption: 'Training → certification → placement → employment' },
  { Illustration: FollowUpIllustration, caption: 'Automated & assisted follow-ups' },
  { Illustration: PlacementIllustration, caption: 'Employer-verified placement' },
  { Illustration: DashboardIllustration, caption: 'Skilling outcomes analytics' },
  { Illustration: SkillGapIllustration, caption: 'AI-powered skill gap analysis' },
  { Illustration: LivelihoodsIllustration, caption: 'Self-employment & diverse livelihoods' },
]

// Edit problem/solution text here — each card pairs one problem with the platform's fix.
export const problemSolutions: ProblemSolution[] = [
  {
    tag: '01',
    icon: ShieldIcon,
    problem: 'Trainee identity is fragmented across programmes, with no way to compare outcomes.',
    solution: 'A canonical trainee ID with a consent-based crosswalk across programmes.',
  },
  {
    tag: '02',
    icon: BriefcaseIcon,
    problem: 'Employers rarely confirm placements, so employment data stays unverified.',
    solution: 'One-click employer confirmation plus OCR and UAN/EPFO checks.',
  },
  {
    tag: '03',
    icon: ChatIcon,
    problem: 'Trainees change numbers and locations, going silent after certification.',
    solution: 'Multi-contact WhatsApp outreach, escalating to a human calling queue.',
  },
  {
    tag: '04',
    icon: LayersIcon,
    problem: 'Outcomes outside formal jobs — self-employment, apprenticeships — go unrecorded.',
    solution: 'Dedicated capture for self-employment and apprenticeship outcomes.',
  },
  {
    tag: '05',
    icon: TrendingUpIcon,
    problem: 'Placement is tracked once, but wage growth and retention after that stay invisible.',
    solution: 'Ongoing wage and retention tracking tied to the placement date.',
  },
  {
    tag: '06',
    icon: SearchIcon,
    problem: "No visibility into why trainees aren't placed, so courses don't improve.",
    solution: 'Non-placement reasons are clustered and fed back into curriculum design.',
  },
]

export const pipeline: PipelineStage[] = [
  {
    tag: '01',
    icon: UsersIcon,
    title: 'Intake',
    description: 'Trainee records come in from providers with opt-in consent captured up front.',
  },
  {
    tag: '02',
    icon: ShieldIcon,
    title: 'Verify',
    description: 'Identity is deduplicated into a canonical ID; employer and placement data get checked.',
  },
  {
    tag: '03',
    icon: SearchIcon,
    title: 'Analyze',
    description: 'Outcomes are clustered by cohort, course and district to surface real patterns.',
  },
  {
    tag: '04',
    icon: TrendingUpIcon,
    title: 'Outcome',
    description: 'Wage, retention and placement status roll up into dashboards stakeholders can act on.',
  },
]

export const sampleRecord = {
  label: 'Illustrative sample · not a real trainee',
  id: 'PRF-2026-0417',
  course: 'Data Analytics · NSQF Level 4',
  status: 'Placed · 6M Retained',
  verified: true,
  wage: '₹18,500/mo',
  wageDelta: '+9% since placement',
}

export const complianceLine = 'Consent-based tracking, aligned with DPDP Act 2023 data-handling principles.'

export const faqs: Faq[] = [
  {
    question: 'What happens if a trainee gives a wrong or fake phone number at enrolment?',
    answer:
      "The system doesn't trust a number just because it was entered. At enrolment, we send an OTP or a WhatsApp template message immediately — if it isn't delivered/read within 24 hours, the contact is marked unverified_primary. The trainee record then shows a \"contact unconfirmed\" flag visible to the provider, who can correct it during onboarding while the trainee is still physically present. If it stays unverified past the training period, the record automatically routes into the field-agent outreach queue instead of the automated WhatsApp pipeline, so it doesn't silently disappear from tracking.",
  },
  {
    question: 'What happens if a trainee changes jobs after their first "employed" confirmation?',
    answer:
      'Employment status isn\'t a one-time field — it\'s a time-series table (employment_status_history) with one row per check-in (3/6/12/24 months), each with its own employer, salary, and verification state. A job change simply adds a new row rather than overwriting the old one. This means the wage-progression chart correctly shows a jump or dip tied to the actual transition date, and retention analytics can distinguish "stayed at same employer" from "changed employer but still employed" — both are meaningfully different outcomes for policy purposes.',
  },
  {
    question: 'What happens if an employer never responds to the verification link?',
    answer:
      "The placement is stored with a verification_status of pending — visible in the trainee's profile and counted separately from verified. After a set window (say 14 days) and one reminder, unresponsive employer verifications age into a stale_pending state and surface in a provider's dashboard as a to-do item — providers often have an existing relationship with the employer and can chase it manually. Crucially, the placement is never silently promoted to \"verified\" just because time passed — the dashboard's default view (and any official reporting) only counts verified, so unverified numbers can't quietly inflate provider success rates.",
  },
  {
    question: 'What happens if two different training programmes enrol the same person under different IDs?',
    answer:
      "Every incoming record carries both the programme's native ID (SDMS, PMKVY-style, etc.) and a canonical ID we derive (a salted hash of Aadhaar or mobile+DOB, depending on what's consented). The crosswalk table maps native_id → canonical_id. When a new enrolment comes in, we check whether its canonical ID already exists; if so, the new training record is appended to the existing trainee's history rather than creating a duplicate person. This is what makes cross-programme comparison possible at all — without it, the same person completing two schemes would look like two separate, uncorrelated outcomes.",
  },
  {
    question: 'What happens if a trainee wants their data deleted?',
    answer:
      'Consent isn\'t a one-time checkbox — it\'s a ledger of grant/withdraw events with timestamps and scope (e.g., "analytics only," "employer verification," "research"). When a trainee revokes consent from their own portal, the deletion pipeline does two things: it hard-deletes PII (name, phone, exact address) from the primary trainee table, and it re-runs the aggregate analytics tables to exclude that trainee going forward. Historical aggregate numbers that already included them anonymously (e.g., last quarter\'s district placement rate) aren\'t retroactively rewritten — since they were already anonymized at the point of aggregation — but nothing personally identifying about them remains queryable anywhere in the system.',
  },
  {
    question: 'What happens if the AI misclassifies a non-placement reason?',
    answer:
      'The LLM\'s output is a suggestion with a confidence score, not a committed database write. Low-confidence classifications (below a set threshold) get routed to a provider admin\'s review queue before being counted in the "top reasons for non-placement" analytics. Even high-confidence ones remain editable — a provider can recategorize a trainee\'s reason if they know the actual situation better than the model does. This keeps the AI layer as an accelerator for triage, not a silent source of policy-shaping numbers nobody checked.',
  },
  {
    question: 'What happens if a district has very few responses — does the dashboard still show a percentage?',
    answer:
      'No — every aggregate metric carries its sample size alongside it, and the UI applies a confidence-based display rule: below a minimum n (say 10 responses), the dashboard shows the raw counts ("3 of 5 placed") instead of a percentage, with a visible "low sample size" badge. This prevents a district with 3 respondents showing "100% placement" from looking equivalent to one with 300 respondents showing the same number — a mistake that would otherwise badly mislead resource-allocation decisions.',
  },
  {
    question: 'What happens if a trainee never had a phone to begin with?',
    answer:
      'The consent and contact-capture form at enrolment has a "no personal phone" path — in that case, the trainee is registered with a designated guardian/family contact or, more commonly, with the local training center or NGO as the primary channel. Their entire follow-up lifecycle is flagged as channel: field_agent from day one rather than being pushed into the WhatsApp automation and failing repeatedly. This keeps the system honest about which trainees are reachable digitally versus which genuinely require in-person follow-up capacity to be budgeted for.',
  },
  {
    question: 'What happens if a training provider tries to fake their own placement numbers?',
    answer:
      'Self-reported placements and employer-verified placements are stored as two distinct fields, never merged into one "placement count." Any dashboard used for official reporting, funding decisions, or provider rankings defaults to filtering on verified = true only. A provider can still see and act on their self-reported pipeline internally (useful for their own tracking), but it\'s visually and structurally separated — labeled "unverified — self-reported" — so it can\'t be presented as equivalent to a verified outcome in any exported report or public-facing scorecard.',
  },
]

export const audiences: Audience[] = [
  {
    icon: GraduationCapIcon,
    title: 'Learners',
    description: 'One verified record of training, certification and what happened after.',
  },
  {
    icon: BuildingIcon,
    title: 'Training providers',
    description: 'Course-level and cohort-level outcome data, not self-reported guesses.',
  },
  {
    icon: UsersIcon,
    title: 'Employers',
    description: 'Confirm placements in one click — no repeated data requests.',
  },
  {
    icon: LandmarkIcon,
    title: 'Policymakers',
    description: 'Compare providers and districts to target future investment.',
  },
  {
    icon: WalletIcon,
    title: 'Funders',
    description: 'Evidence of public value, tied to real employment and wage outcomes.',
  },
]

export const techStack = 'MERN · React Native · PostgreSQL/Supabase · OpenAI + LangChain · Vercel'

export const standards = ['NSQF Aligned', 'EPFO/UAN Checks', 'DPDP Act 2023', 'Consent-Governed Data', 'WhatsApp + SMS']

export interface AiCapability {
  icon: Icon
  title: string
  description: string
  snippet: string
}

export const aiCapabilities: AiCapability[] = [
  {
    icon: LayersIcon,
    title: 'Skill Ontology Mapping',
    description:
      'Normalizes course and trainee skill tags against a shared taxonomy, so a "Data Analytics" course in one district can be compared with one in another.',
    snippet: "ontology.map(course_id, standard='NSQF')",
  },
  {
    icon: TrendingUpIcon,
    title: 'Placement Demand Forecasting',
    description:
      'Reads recent employer hiring mandates and regional signals to flag which skills will be in demand before the next cohort graduates.',
    snippet: 'demand_forecast(district_id, horizon_months=6)',
  },
  {
    icon: ShieldIcon,
    title: 'Verifiable Credentials',
    description:
      'Bridge-course completions and employer confirmations are issued as tamper-evident digital credentials, not just a row in a database.',
    snippet: "credentials.issue(trainee_id, type='bridge_module')",
  },
]

export interface Vocation {
  code: string
  title: string
  level: string
  readiness: number
  gap: string
  bridge: string
  baselineWage: string
  retainedWage: string
}

export const vocations: Vocation[] = [
  {
    code: 'NOS-IT-9821',
    title: 'Data Analytics & Visualization',
    level: 'NSQF Level 5',
    readiness: 82,
    gap: 'Advanced dashboarding (DAX / calculated fields)',
    bridge: 'Advanced Data Modeling — 12 hrs',
    baselineWage: '₹18,000/mo',
    retainedWage: '₹24,500/mo',
  },
  {
    code: 'NOS-EL-4410',
    title: 'Electrical Maintenance',
    level: 'NSQF Level 4',
    readiness: 76,
    gap: 'Industrial safety certification (PPE, lockout-tagout)',
    bridge: 'Workplace Safety Bridge — 8 hrs',
    baselineWage: '₹14,500/mo',
    retainedWage: '₹18,200/mo',
  },
  {
    code: 'NOS-WD-3310',
    title: 'Web Development',
    level: 'NSQF Level 5',
    readiness: 88,
    gap: 'Deployment & version control workflows',
    bridge: 'Git & CI/CD Fundamentals — 6 hrs',
    baselineWage: '₹16,000/mo',
    retainedWage: '₹22,000/mo',
  },
  {
    code: 'NOS-CN-5120',
    title: 'CNC Machining',
    level: 'NSQF Level 4',
    readiness: 71,
    gap: 'CAM software proficiency for complex toolpaths',
    bridge: 'Applied CAM Programming — 16 hrs',
    baselineWage: '₹15,200/mo',
    retainedWage: '₹19,000/mo',
  },
]

export interface BenchmarkMetric {
  label: string
  value: string
  detail: string
}

export const benchmarkMetrics: BenchmarkMetric[] = [
  { label: 'Demonstration cohort', value: '1,342', detail: 'Synthetic trainees in demo dataset' },
  { label: '180-day retention tracked', value: '18.4%', detail: '81 verified via EPFO sandbox adapter' },
  { label: 'Active employer mandates', value: '622', detail: 'Enterprise & MSME openings in demo DB' },
  { label: 'Median wage growth', value: '+8.0%', detail: '₹4.47L → ₹4.60L avg across 308 placements' },
]

export interface Testimonial {
  quote: string
  role: string
  scenario: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'It shifted our reporting from counting who finished a batch to tracking who actually stayed employed six and twelve months later.',
    role: 'State Skill Mission Director (illustrative persona)',
    scenario: 'Monitoring multi-district vocational milestones',
  },
  {
    quote:
      'We can shortlist against verified competencies instead of a resume PDF. Time-to-hire dropped noticeably.',
    role: 'Corporate Talent Acquisition Lead (illustrative persona)',
    scenario: 'Evaluating pre-trained candidates',
  },
  {
    quote:
      "For the first time we have longitudinal visibility into outcomes with an audit trail we can actually defend, not just a provider's word.",
    role: 'Independent Evaluation Consultant (illustrative persona)',
    scenario: 'Verifying 3M / 6M / 12M retention claims',
  },
]

export interface FooterColumn {
  title: string
  links: string[]
}

export const footerColumns: FooterColumn[] = [
  { title: 'Platform', links: ['Problem → Solution', 'How It Works', 'AI Foundation', 'Simulator'] },
  { title: 'Data & Trust', links: ['Benchmark Metrics', 'Compliance', 'Edge Cases (FAQ)'] },
  { title: 'Stakeholders', links: ['Learners', 'Training Providers', 'Employers', 'Policymakers'] },
]

export interface DemoAccount {
  role: string
  label: string
  email: string
}

// Password for every seeded demo account: Demo@1234
export const demoPassword = 'Demo@1234'

export const demoAccounts: DemoAccount[] = [
  { role: 'learner', label: 'Learner', email: 'learner@proficia.demo' },
  { role: 'training_provider', label: 'Training Provider', email: 'provider@proficia.demo' },
  { role: 'employer', label: 'Employer', email: 'employer@proficia.demo' },
  { role: 'policymaker', label: 'Policymaker', email: 'policymaker@proficia.demo' },
  { role: 'funder', label: 'Funder', email: 'funder@proficia.demo' },
]

export interface SignupRole {
  role: string
  label: string
  description: string
}

export const signupRoles: SignupRole[] = [
  { role: 'learner', label: 'Learner', description: 'Track my own training, certification & placement' },
  { role: 'training_provider', label: 'Training Provider', description: 'Report cohort & course outcomes' },
  { role: 'employer', label: 'Employer', description: 'Confirm placements & hire verified talent' },
  { role: 'policymaker', label: 'Policymaker', description: 'Compare providers & districts' },
  { role: 'funder', label: 'Funder', description: 'Track evidence of public value' },
]

export type BuildStatus = 'done' | 'partial' | 'planned'

export interface BuildItem {
  title: string
  status: BuildStatus
  note: string
}

// Honest status against PS 26135's "Expected Solution" checklist —
// what's actually wired to real data vs. still a designed mockup.
export const buildItems: BuildItem[] = [
  {
    title: 'Consent-based trainee accounts',
    status: 'done',
    note: 'Real Supabase auth + role-based signup (5 stakeholder types) with phone & email login.',
  },
  {
    title: 'Role-specific profile capture',
    status: 'done',
    note: 'Signup collects role-specific details (qualification, org, industry, etc.) into a real profiles table.',
  },
  {
    title: 'Canonical trainee ID & crosswalk',
    status: 'done',
    note: 'Every learner gets a stable canonical ID derived from their account. Trainings carry an optional native programme ID (SDMS/PMKVY) alongside it — a real crosswalk field, shown on the learner dashboard.',
  },
  {
    title: 'Placement & employment signal capture',
    status: 'done',
    note: 'Learners log real placements (formal/self-employed/apprenticeship) into a live placements table.',
  },
  {
    title: 'Automated & assisted follow-up (WhatsApp/SMS/calls)',
    status: 'partial',
    note: 'Providers get real one-click WhatsApp/SMS/call links (wa.me / sms: / tel: deep links) pre-filled with the trainee’s number, plus a follow-up log. Sending is still user-initiated — no backend WhatsApp Business API push notifications yet.',
  },
  {
    title: 'Employer validation (OCR, UAN/EPFO checks)',
    status: 'partial',
    note: 'Real client-side OCR (Tesseract.js, runs in-browser) checks whether an uploaded offer letter mentions the employer’s name, plus UAN format validation (12-digit) and a server-verified "Confirm Placement" action. No live EPFO government API lookup — that requires official access we don’t have.',
  },
  {
    title: 'Self-employment & apprenticeship capture',
    status: 'done',
    note: 'Placement type (formal / self-employed / apprenticeship) is a real, required field on every placement record.',
  },
  {
    title: 'Wage & retention progression tracking',
    status: 'done',
    note: 'Learners add 3/6/12/24-month retention check-ins with status and current wage — a real time series, not a snapshot.',
  },
  {
    title: 'Cohort / course / provider / district analytics',
    status: 'done',
    note: 'Policymaker & Funder dashboards run live aggregate queries by course and by district over real data, alongside verification and retention rates.',
  },
  {
    title: 'AI skill-gap & non-placement clustering',
    status: 'partial',
    note: 'Non-placement reasons are logged as free text and clustered into categories (wage mismatch, location, skill gap, etc.) via transparent keyword rules — real and running on the Policymaker/Funder dashboard, but rule-based, not a trained ML model.',
  },
]

export interface DetailField {
  id: string
  label: string
  type: 'text' | 'date'
  placeholder?: string
}

// Extra fields collected per role, in addition to name / email / phone / password.
export const roleDetailFields: Record<string, DetailField[]> = {
  learner: [
    { id: 'dob', label: 'Date of Birth', type: 'date' },
    { id: 'state', label: 'State', type: 'text', placeholder: 'e.g. Maharashtra' },
    { id: 'district', label: 'District', type: 'text', placeholder: 'e.g. Pune' },
    { id: 'qualification', label: 'Highest Qualification', type: 'text', placeholder: 'e.g. 12th Pass, ITI, Diploma' },
    { id: 'interest', label: 'Area of Interest', type: 'text', placeholder: 'e.g. Data Analytics, Electrical' },
  ],
  training_provider: [
    { id: 'orgName', label: 'Organization Name', type: 'text', placeholder: 'e.g. Ramesh Skilling Institute' },
    { id: 'regId', label: 'Registration ID (NSDC / SDMS)', type: 'text', placeholder: 'e.g. NSDC-2026-1147' },
    { id: 'state', label: 'State', type: 'text' },
    { id: 'district', label: 'District', type: 'text' },
  ],
  employer: [
    { id: 'company', label: 'Company Name', type: 'text' },
    { id: 'industry', label: 'Industry', type: 'text', placeholder: 'e.g. Manufacturing, IT Services' },
    { id: 'companySize', label: 'Company Size', type: 'text', placeholder: 'e.g. 11–50 employees' },
  ],
  policymaker: [
    { id: 'department', label: 'Department / Mission', type: 'text', placeholder: 'e.g. State Skill Development Mission' },
    { id: 'state', label: 'State', type: 'text' },
  ],
  funder: [
    { id: 'orgName', label: 'Organization Name', type: 'text' },
    { id: 'focusArea', label: 'Focus Area', type: 'text', placeholder: 'e.g. CSR, District Development Fund' },
  ],
}
