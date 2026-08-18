import { api, fetchWithAuth } from '@/lib/api'

export const InternshipService = {
  getAll: async () => {
    const { data } = await api.get('/api/internships')
    return data
  },

  getOne: async (sqid: string) => {
    const { data } = await api.get(`/api/internships/${sqid}`)
    return data
  },

  create: async (payload: any) => {
    const { data } = await api.post('/api/internships', payload)
    return data
  },

  update: async (sqid: string, payload: any) => {
    const { data } = await api.patch(`/api/internships/${sqid}`, payload)
    return data
  },

  delete: async (sqid: string) => {
    const { data } = await api.delete(`/api/internships/${sqid}`)
    return data
  },
}

// Offers
export const InternshipOffersService = {
  getOffers: async () => {
    const { data } = await api.get(`/api/internships/offers`)
    return data
  },

  acceptOffer: async (id: string) => {
    const { data } = await api.post(`/api/internships/offers/${id}/accept`)
    return data
  },

  rejectOffer: async (id: string) => {
    const { data } = await api.post(`/api/internships/offers/${id}/reject`)
    return data
  },
  withdrawOffer: async (id: string) => {
    const { data } = await api.post(`/api/internships/offers/${id}/withdraw`)
    return data
  },
}

// Applications
export const InternshipApplicationsService = {
  getApplications: async () => {
    const { data } = await api.get(`/api/internships/applications`)
    return data
  },
  createApplication: async (payload: {
    internship: string
    resume: string
    cover_letter?: string
  }) => {
    const res = await fetchWithAuth(
      `${import.meta.env.VITE_API_URL}/api/internships/application`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    )

    if (!res.ok) {
      const error = await res.json().catch(() => null)
      throw new Error(
        error?.detail ??
          error?.message ??
          'Application failed. Please try again.',
      )
    }

    return res.json()
  },
  acceptApplication: async (id: string) => {
    const { data } = await api.post(
      `/api/internships/applications/${id}/accept`,
    )
    return data
  },

  rejectApplication: async (id: string) => {
    const { data } = await api.post(
      `/api/internships/applications/${id}/reject`,
    )
    return data
  },
  withdrawApplication: async (id: string) => {
    const { data } = await api.post(
      `/api/internships/applications/${id}/withdraw`,
    )
    return data
  },
}

// Engagements
export const InternshipEngagementsService = {
  getAll: async () => {
    const { data } = await api.get(`/api/internships/engagements`)
    return data
  },
  getOne: async (sqid: string) => {
    const { data } = await api.get(`/api/internships/engagements/${sqid}`)
    return data
  },
}
