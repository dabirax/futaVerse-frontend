import { useMutation, useQuery, useQueryClient } from "react-query";
import { InternshipService } from "@/services/internships";

export const useInternships = () => {
  return useQuery({
    queryKey: ["internships"],
    queryFn: InternshipService.getAll,
  });
};

export const useCreateInternship = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: InternshipService.create,
    onSuccess: () => {
      qc.invalidateQueries(["internships"]);
    },
  });
};

export const useInternship = (id: number) => {
  return useQuery({
    queryKey: ["internship", id],
    queryFn: () => InternshipService.getOne(id),
    enabled: !!id
  });
};



export const useUpdateInternship = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: any) =>
      InternshipService.update(id, payload),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries(["internships"]);
      qc.invalidateQueries(["internship", id]);
    },
  });
};




export const useDeleteInternship = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: InternshipService.delete,
    onSuccess: () => {
      qc.invalidateQueries(["internships"]);
    },
  });
};
