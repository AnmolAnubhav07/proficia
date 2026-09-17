import { supabase } from './supabaseClient'

export interface Training {
  id: string
  learner_id: string
  provider_id: string | null
  course_name: string
  nsqf_level: string | null
  status: 'enrolled' | 'completed' | 'dropped'
  non_placement_reason: string | null
  native_id: string | null
  district: string | null
  state: string | null
  created_at: string
}

export interface Placement {
  id: string
  training_id: string
  learner_id: string
  placement_type: 'formal' | 'self_employed' | 'apprenticeship'
  company_name: string
  role_title: string | null
  wage: number | null
  joining_date: string | null
  employer_verified: boolean
  employer_verified_at: string | null
  uan_number: string | null
  offer_letter_checked: boolean
  offer_letter_match: boolean | null
  created_at: string
}

export interface RetentionCheckin {
  id: string
  placement_id: string
  learner_id: string
  checkin_month: 3 | 6 | 12 | 24
  status: 'retained' | 'changed_employer' | 'unemployed'
  wage: number | null
  created_at: string
}

export interface FollowUpLog {
  id: string
  learner_id: string
  logged_by: string | null
  channel: 'whatsapp' | 'sms' | 'call' | 'field_agent'
  note: string | null
  created_at: string
}

export interface EmployerPlacementRow {
  id: string
  learner_name: string
  role_title: string | null
  wage: number | null
  joining_date: string | null
  employer_verified: boolean
  uan_number: string | null
  offer_letter_checked: boolean
  offer_letter_match: boolean | null
  created_at: string
}

export interface OutcomeAggregates {
  total_trainings: number
  total_placements: number
  verified_placements: number
  self_employed: number
  apprenticeships: number
  avg_wage: number | null
  retained_checkins: number
  total_checkins: number
  by_course: { course_name: string; trainings: number; placements: number }[]
  by_district: { district: string; trainings: number; placements: number }[]
  non_placement_reasons: string[]
}

// Canonical trainee ID derived from the profile UUID — stable across programmes,
// no separate identity system needed.
export function canonicalId(userId: string) {
  return `PRF-${userId.replace(/-/g, '').slice(0, 10).toUpperCase()}`
}

// Rule-based clustering of free-text non-placement reasons into curriculum-feedback
// categories. Transparent keyword matching, not a trained model — labeled as such in the UI.
const REASON_CATEGORIES: { label: string; keywords: string[] }[] = [
  { label: 'Wage / compensation mismatch', keywords: ['salary', 'wage', 'pay', 'compensation', 'stipend'] },
  { label: 'Location constraint', keywords: ['location', 'relocat', 'travel', 'commute', 'distance', 'city'] },
  { label: 'Skill / technical gap', keywords: ['skill', 'technical', 'weak', 'knowledge', 'practical', 'hands-on'] },
  { label: 'Certification / documentation', keywords: ['certificat', 'document', 'degree', 'proof', 'id proof'] },
  { label: 'Family / personal reasons', keywords: ['family', 'health', 'personal', 'marriage', 'medical'] },
  { label: 'No suitable openings', keywords: ['no opening', 'no vacan', 'no job', 'not hiring', 'no demand'] },
]

export interface ReasonCluster {
  label: string
  count: number
  examples: string[]
}

export function clusterNonPlacementReasons(reasons: string[]): ReasonCluster[] {
  const buckets = new Map<string, ReasonCluster>()
  const other: ReasonCluster = { label: 'Other / uncategorized', count: 0, examples: [] }

  for (const reason of reasons) {
    const lower = reason.toLowerCase()
    const match = REASON_CATEGORIES.find((c) => c.keywords.some((k) => lower.includes(k)))
    const bucket = match
      ? (buckets.get(match.label) ?? { label: match.label, count: 0, examples: [] })
      : other
    bucket.count++
    if (bucket.examples.length < 3) bucket.examples.push(reason)
    if (match) buckets.set(match.label, bucket)
  }

  const result = [...buckets.values()].sort((a, b) => b.count - a.count)
  if (other.count > 0) result.push(other)
  return result
}

function unwrap<T>({ data, error }: { data: T | null; error: { message: string } | null }): T {
  if (error) throw new Error(error.message)
  return data as T
}

// ---- Learner ----
export async function listMyTrainings(userId: string) {
  return unwrap<Training[]>(
    await supabase.from('trainings').select('*').eq('learner_id', userId).order('created_at', { ascending: false }),
  )
}

export async function addTraining(input: {
  learner_id: string
  course_name: string
  nsqf_level: string
  native_id?: string
  district?: string
  state?: string
}) {
  return unwrap<Training[]>(await supabase.from('trainings').insert(input).select())
}

export async function setNonPlacementReason(trainingId: string, reason: string) {
  return unwrap(await supabase.from('trainings').update({ non_placement_reason: reason }).eq('id', trainingId))
}

export async function listMyPlacements(userId: string) {
  return unwrap<Placement[]>(
    await supabase.from('placements').select('*').eq('learner_id', userId).order('created_at', { ascending: false }),
  )
}

export async function addPlacement(input: {
  training_id: string
  learner_id: string
  placement_type: Placement['placement_type']
  company_name: string
  role_title: string
  wage: number | null
  joining_date: string | null
  uan_number?: string
  offer_letter_checked?: boolean
  offer_letter_match?: boolean | null
}) {
  return unwrap<Placement[]>(await supabase.from('placements').insert(input).select())
}

export async function listMyCheckins(userId: string) {
  return unwrap<RetentionCheckin[]>(
    await supabase.from('retention_checkins').select('*').eq('learner_id', userId).order('checkin_month'),
  )
}

export async function addCheckin(input: {
  placement_id: string
  learner_id: string
  checkin_month: RetentionCheckin['checkin_month']
  status: RetentionCheckin['status']
  wage: number | null
}) {
  return unwrap<RetentionCheckin[]>(await supabase.from('retention_checkins').insert(input).select())
}

export async function listMyFollowUps(userId: string) {
  return unwrap<FollowUpLog[]>(
    await supabase.from('follow_up_logs').select('*').eq('learner_id', userId).order('created_at', { ascending: false }),
  )
}

// ---- Training Provider ----
export async function listProviderTrainings(providerId: string) {
  return unwrap<Training[]>(
    await supabase.from('trainings').select('*').eq('provider_id', providerId).order('created_at', { ascending: false }),
  )
}

export async function findLearnerIdByEmail(email: string) {
  const { data, error } = await supabase.rpc('get_learner_id_by_email', { p_email: email })
  if (error) throw new Error(error.message)
  return data as string | null
}

export async function addTraineeTraining(input: {
  learner_id: string
  provider_id: string
  course_name: string
  nsqf_level: string
  native_id?: string
  district?: string
  state?: string
}) {
  return unwrap<Training[]>(await supabase.from('trainings').insert(input).select())
}

export async function getTraineeContact(learnerId: string) {
  const { data, error } = await supabase.rpc('get_trainee_contact', { p_learner_id: learnerId })
  if (error) throw new Error(error.message)
  return (data?.[0] ?? null) as { full_name: string; phone: string | null } | null
}

export async function logFollowUp(input: {
  learner_id: string
  logged_by: string
  channel: FollowUpLog['channel']
  note: string
}) {
  return unwrap<FollowUpLog[]>(await supabase.from('follow_up_logs').insert(input).select())
}

export async function listPlacementsForTrainings(trainingIds: string[]) {
  if (trainingIds.length === 0) return [] as Placement[]
  return unwrap<Placement[]>(await supabase.from('placements').select('*').in('training_id', trainingIds))
}

// ---- Employer ----
export async function listEmployerPlacements() {
  const { data, error } = await supabase.rpc('get_employer_placements')
  if (error) throw new Error(error.message)
  return (data ?? []) as EmployerPlacementRow[]
}

export async function confirmPlacement(placementId: string) {
  const { error } = await supabase.rpc('confirm_placement', { p_placement_id: placementId })
  if (error) throw new Error(error.message)
}

// ---- Policymaker / Funder ----
export async function getOutcomeAggregates() {
  const { data, error } = await supabase.rpc('get_outcome_aggregates')
  if (error) throw new Error(error.message)
  return data as OutcomeAggregates
}
