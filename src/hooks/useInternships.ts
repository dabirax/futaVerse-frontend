import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InternshipService } from "@/services/internships";

export const useInternships = () => {
  return useQuery({
    queryKey: ["internships"],
    queryFn: () => InternshipService.getAll(),
  });
};

export const useCreateInternship = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => InternshipService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["internships"] });
    },
  });
};

export const useInternship = (id: number) => {
  return useQuery({
    queryKey: ["internship", id],
    queryFn: () => InternshipService.getOne(id),
    enabled: !!id,
  });
};

export const useUpdateInternship = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      InternshipService.update(id, payload),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["internships"] });
      qc.invalidateQueries({ queryKey: ["internship", variables.id] });
    },
  });
};

export const useDeleteInternship = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => InternshipService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["internships"] });
    },
  });
};
