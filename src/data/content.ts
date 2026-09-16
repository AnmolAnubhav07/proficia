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
