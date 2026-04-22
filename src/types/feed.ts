export interface FeedInternship {
  id: number
  sqid: string
  title: string
  description: string
  work_mode: 'Remote' | 'Onsite' | 'Hybrid'
  engagement_type: 'Full-time' | 'Part-time'
  location: string
  industry: string
  duration_weeks: number
  start_date: string
  end_date: string
  is_paid: boolean
  stipend: string
  available_slots: number
  remaining_slots: number
  skills_required: string[]
  require_resume: boolean
  require_cover_letter: boolean
  created_at: string
  alumnus: number
}

export interface FeedMentorship {
  sqid: string
  title: string
  description: string
  category: string
  work_mode: 'Remote' | 'Onsite' | 'Hybrid'
  duration_weeks: number
  start_date: string
  end_date: string
  available_slots: number
  remaining_slots: number
  created_at: string
  alumnus: number
}