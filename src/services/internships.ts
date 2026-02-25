import { api } from "@/lib/api";

export const InternshipService = {
  getAll: async () => {
    const {data} = await api.get("/api/internships");
    return data;
  },

  getOne: async (id: number) => {
    const {data} = await api.get(`/api/internships/${id}`);
    return data;
  },

  create: async (payload: any) => {
    const {data} = await api.post("/api/internships", payload);
    return data;
  },

  update: async (id: number, payload: any) => {
    const {data} = await api.patch(`/api/internships/${id}`, payload);
    return data;
  },

  delete: async (id: number) => {
    const {data} = await api.delete(`/api/internships/${id}`);
    return data;
  },
};

// Offers
export const InternshipOffersService = {
  getOffers: async () => {
    const { data } = await api.get(`/api/internships/offers`);
    return data;
  },
  
  acceptOffer: async (id: number) => {
    const { data } = await api.post(`/api/internships/offers/${id}/accept`);
    return data;
  },

  rejectOffer: async (id: number) => {
    const { data } = await api.post(`/api/internships/offers/${id}/reject`);
    return data;
  },
  withdrawOffer: async (id: number) => {
    const { data } = await api.post(`/api/internships/offers/${id}/withdraw`);
    return data;
  },
};

// Applications
export const InternshipApplicationsService = {
  getApplications: async () => {
    const { data } = await api.get(`/api/internships/applications`);
    return data;
  },
  acceptApplication: async (id: number) => {
    const { data } = await api.post(`/api/internships/applications/${id}/accept`);
    return data;
  },

  rejectApplication: async (id: number) => {
    const { data } = await api.post(`/api/internships/applications/${id}/reject`);
    return data;
  },    
  withdrawApplication: async (id: number) => {
    const { data } = await api.post(`/api/internships/applications/${id}/withdraw`);
    return data;
  }
};


// Engagements
export const InternshipEngagementsService = {
  getEngagements: async () => {
    const { data } = await api.get(`/api/internships/engagements`);
    return data;
  },
};