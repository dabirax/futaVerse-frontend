import { fetchWithAuth } from '@/lib/api'

export interface UploadedImage {
  sqid: string
  image: string
  url: string
}

export async function uploadProfileImage(file: File): Promise<UploadedImage> {
  const formData = new FormData()
  formData.append('image', file)

  const res = await fetchWithAuth(
    `${import.meta.env.VITE_API_URL}/api/profile-img`,
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
        'Image upload failed. Please try again.',
    )
  }

  return res.json()
}
