import type { Resume } from '@/services/resumes'

interface ProfileBase {
  sqid: string
  created_at: string
  profile_img_url: string | null
  phone_num: string | null
  gender: string | null
  firstname: string
  lastname: string
  middlename: string | null
  address: string | null
  state: string | null
  country: string | null
  description: string
  matric_no: string | null
  department: string | null
  faculty: string | null
  linkedin_url: string | null
  github_url: string | null
  website_url: string | null
  x_url: string | null
  instagram_url: string | null
  facebook_url: string | null
  avg_rating: number | null
  total_reviews: number
}

export interface StudentProfile extends ProfileBase {
  skills: Array<string>
  resumes: Array<Resume>
  level: number | null
  cgpa: string | null
  expected_grad_year: string | null
  preferred_industry: string | null
  preferred_company_type: string | null
  willingness_to_be_mentored: boolean
}

export interface AlumnusProfile extends ProfileBase {
  previous_comps: Array<Record<string, unknown>>
  grad_year: string | null
  current_job_title: string | null
  current_company: string | null
  industry: string | null
  years_of_exp: number | null
  company_linkedin_url: string | null
  company_website_url: string | null
}

interface UserBase {
  sqid: string
  email: string
  created_at: string
}

export interface StudentUser extends UserBase {
  role: 'student'
  profile: StudentProfile
}

export interface AlumnusUser extends UserBase {
  role: 'alumni'
  profile: AlumnusProfile
}

export type User = StudentUser | AlumnusUser

export interface MeResponse {
  data: User
  status: string
}
