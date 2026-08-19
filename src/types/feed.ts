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
  skills_required: Array<string>
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

export interface FeedItemData {
  sqid: string
  type: string
  action: string
  title: string
  alumni?: {
    sqid: string
    full_name: string
  }
  category?: string
  created_at?: string
  start_date?: string
  available_slots?: number
  remaining_slots?: number
  is_paid?: boolean
  stipend?: string
  work_mode?: string
  engagement_type?: string
  company?: string
  date?: string
  mode?: string
  virtual_meeting?: string
  focus_areas?: Array<string>
}

export interface FeedResponseItem {
  sqid: string
  event_type:
    | 'mentorship_created'
    | 'mentorship_started'
    | 'mentorship_completed'
    | 'internship_created'
    | 'internship_started'
    | 'internship_completed'
    | 'engagement_started'
    | 'engagement_completed'
    | 'event_created'
  data: FeedItemData
  score: number
  created_at: string
}
