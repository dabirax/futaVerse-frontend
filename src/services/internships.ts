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

export const InternshipOffersService = {
  getOffers: async () => {
    const { data } = await api.get(`/api/internships/offers`);
    return data;
  },
};
