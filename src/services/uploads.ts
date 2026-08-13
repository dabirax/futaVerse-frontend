export interface UploadedImage {
  sqid: string
  image: string
  url: string
}

export async function uploadProfileImage(file: File): Promise<UploadedImage> {
  const formData = new FormData()
  formData.append('image', file)

  const token = sessionStorage.getItem('access_token')
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile-img`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  })

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
