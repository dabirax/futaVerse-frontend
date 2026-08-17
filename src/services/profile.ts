import type { AlumnusProfile, StudentProfile } from '@/types/user'

const authHeaders = (): Record<string, string> => {
  const token = sessionStorage.getItem('access_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

const BASE = () => import.meta.env.VITE_API_URL

type StudentUpdatePayload = Partial<
  Pick<
    StudentProfile,
    | 'firstname'
    | 'lastname'
    | 'middlename'
    | 'gender'
    | 'address'
    | 'country'
    | 'state'
    | 'phone_num'
    | 'matric_no'
    | 'department'
    | 'faculty'
    | 'expected_grad_year'
    | 'level'
    | 'cgpa'
    | 'skills'
    | 'description'
    | 'linkedin_url'
    | 'x_url'
    | 'instagram_url'
    | 'facebook_url'
    | 'github_url'
    | 'website_url'
  >
>

type AlumnusUpdatePayload = Partial<
  Pick<
    AlumnusProfile,
    | 'firstname'
    | 'lastname'
    | 'middlename'
    | 'gender'
    | 'address'
    | 'country'
    | 'state'
    | 'phone_num'
    | 'matric_no'
    | 'department'
    | 'faculty'
    | 'grad_year'
    | 'current_job_title'
    | 'current_company'
    | 'industry'
    | 'years_of_exp'
    | 'description'
    | 'linkedin_url'
    | 'x_url'
    | 'instagram_url'
    | 'facebook_url'
    | 'github_url'
    | 'website_url'
  >
>

async function patchProfile<T>(payload: T): Promise<void> {
  const res = await fetch(`${BASE()}/api/auth/me`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(
      error?.detail ?? error?.message ?? 'Failed to update profile.',
    )
  }
}

export async function updateStudentProfile(
  payload: StudentUpdatePayload,
): Promise<void> {
  return patchProfile(payload)
}

export async function updateAlumnusProfile(
  payload: AlumnusUpdatePayload,
): Promise<void> {
  return patchProfile(payload)
}
