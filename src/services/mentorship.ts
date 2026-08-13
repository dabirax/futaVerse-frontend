import { api } from '@/lib/api'

export const MentorshipService = {
  getAll: async () => {
    const { data } = await api.get('/api/mentorships')
    return data
  },

  getOne: async (sqid: string) => {
    const { data } = await api.get(`/api/mentorships/${sqid}`)
    return data
  },

  create: async (payload: any) => {
    const { data } = await api.post('/api/mentorships', payload)
    return data
  },

  update: async (sqid: string, payload: any) => {
    const { data } = await api.patch(`/api/mentorships/${sqid}`, payload)
    return data
  },

  delete: async (sqid: string) => {
    const { data } = await api.delete(`/api/mentorships/${sqid}`)
    return data
  },

  getChoices: async () => {
    const { data } = await api.get(`/api/mentorships/choices`)
    return data
  },

  toggleActive: async (sqid: string, is_active: boolean) => {
    const { data } = await api.patch(`/api/mentorships/${sqid}/toggle-active`, {
      is_active,
    })
    return data
  },
}

// Offers
export const MentorshipOffersService = {
  getOffers: async () => {
    const { data } = await api.get(`/api/mentorships/offers`)
    return data
  },

  createOffer: async (payload: any) => {
    const { data } = await api.post(`/api/mentorships/offer`, payload)
    return data
  },

  acceptOffer: async (sqid: string) => {
    const { data } = await api.post(`/api/mentorships/offers/${sqid}/accept`)
    return data
  },

  rejectOffer: async (sqid: string) => {
    const { data } = await api.post(`/api/mentorships/offers/${sqid}/reject`)
    return data
  },
  withdrawOffer: async (sqid: string) => {
    const { data } = await api.post(`/api/mentorships/offers/${sqid}/withdraw`)
    return data
  },
}

// Applications
export const MentorshipApplicationsService = {
  getApplications: async () => {
    const { data } = await api.get(`/api/mentorships/applications`)
    return data
  },
  createApplication: async (payload: any) => {
    const { data } = await api.post(`/api/mentorships/application`, payload)
    return data
  },
  acceptApplication: async (sqid: string) => {
    const { data } = await api.post(
      `/api/mentorships/applications/${sqid}/accept`,
    )
    return data
  },

  rejectApplication: async (sqid: string) => {
    const { data } = await api.post(
      `/api/mentorships/applications/${sqid}/reject`,
    )
    return data
  },
  withdrawApplication: async (sqid: string) => {
    const { data } = await api.post(
      `/api/mentorships/applications/${sqid}/withdraw`,
    )
    return data
  },
}

// Engagements
export const MentorshipEngagementsService = {
  getAll: async () => {
    const { data } = await api.get(`/api/mentorships/engagements`)
    return data
  },
  getOne: async (sqid: string) => {
    const { data } = await api.get(`/api/mentorships/engagements/${sqid}`)
    return data
  },
}
