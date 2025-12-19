import { api } from "@/lib/api";

export const InternshipService = {
  getAll: async () => {
    const res = await api.get("/api/internships");
    return res.data;
  },

  getOne: async (id: number) => {
    const res = await api.get(`/api/internships/${id}`);
    return res.data;
  },

  create: async (payload: any) => {
    const res = await api.post("/api/internships", payload);
    return res.data;
  },

  update: async (id: number, payload: any) => {
    const res = await api.patch(`/api/internships/${id}`, payload);
    return res.data;
  },

  delete: async (id: number) => {
    const res = await api.delete(`/api/internships/${id}`);
    return res.data;
  },
};
