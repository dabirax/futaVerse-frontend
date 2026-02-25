import { api } from "@/lib/api";

export const MentorshipService = {
  getAll: async () => {
    const {data} = await api.get("/api/mentorships");
    return data;
  },

  getOne: async (id: number) => {
    const {data} = await api.get(`/api/mentorships/${id}`);
    return data;
  },

  create: async (payload: any) => {
    const {data} = await api.post("/api/mentorships", payload);
    return data;
  },

  update: async (id: number, payload: any) => {
    const {data} = await api.patch(`/api/mentorships/${id}`, payload);
    return data;
  },

  delete: async (id: number) => {
    const {data} = await api.delete(`/api/mentorships/${id}`);
    return data;
  },
};

// Offers
export const MentorshipOffersService = {
  getOffers: async () => {
    const { data } = await api.get(`/api/mentorships/offers`);
    return data;
  },
  
  acceptOffer: async (id: number) => {
    const { data } = await api.post(`/api/mentorships/offers/${id}/accept`);
    return data;
  },

  rejectOffer: async (id: number) => {
    const { data } = await api.post(`/api/mentorships/offers/${id}/reject`);
    return data;
  },
  withdrawOffer: async (id: number) => {
    const { data } = await api.post(`/api/mentorships/offers/${id}/withdraw`);
    return data;
  },
};

// Applications
export const MentorshipApplicationsService = {
  getApplications: async () => {
    const { data } = await api.get(`/api/mentorships/applications`);
    return data;
  },
  createApplication: async (payload: any) => {
    const { data } = await api.post(`/api/mentorships/applications`, payload);
    return data;
  },
  acceptApplication: async (id: number) => {
    const { data } = await api.post(`/api/mentorships/applications/${id}/accept`);
    return data;
  },

  rejectApplication: async (id: number) => {
    const { data } = await api.post(`/api/mentorships/applications/${id}/reject`);
    return data;
  },    
  withdrawApplication: async (id: number) => {
    const { data } = await api.post(`/api/mentorships/applications/${id}/withdraw`);
    return data;
  }
};


// Engagements
export const MentorshipEngagementsService = {
  getEngagements: async () => {
    const { data } = await api.get(`/api/mentorships/engagements`);
    return data;
  },
};