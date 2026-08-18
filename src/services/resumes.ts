import { fetchWithAuth } from '@/lib/api'

export interface Resume {
  sqid: string
  resume: string
  filename: string
  uploaded_at: string
}

export interface ResumeListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Array<Resume>
}

export async function listResumes(): Promise<ResumeListResponse> {
  const res = await fetchWithAuth(
    `${import.meta.env.VITE_API_URL}/api/students/resumes`,
  )

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(
      error?.detail ?? error?.message ?? 'Could not load your resumes.',
    )
  }

  return res.json()
}

export async function uploadResume(file: File): Promise<Resume> {
  const formData = new FormData()
  formData.append('resume', file)
  formData.append('filename', file.name)

  const res = await fetchWithAuth(
    `${import.meta.env.VITE_API_URL}/api/students/resumes/upload`,
    {
      method: 'POST',
      body: formData,
    },
  )

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(
      error?.detail ??
        error?.message ??
        'Resume upload failed. Please try again.',
    )
  }

  return res.json()
}

export async function deleteResume(sqid: string): Promise<void> {
  const res = await fetchWithAuth(
    `${import.meta.env.VITE_API_URL}/api/students/resumes/${sqid}`,
    { method: 'DELETE' },
  )

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(
      error?.detail ?? error?.message ?? 'Could not delete this resume.',
    )
  }
}
