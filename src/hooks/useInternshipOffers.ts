import { useQuery } from "@tanstack/react-query";
import { InternshipOffersService } from "@/services/internships";

export const useInternshipOffers = () => {
  return useQuery({
    queryKey: ["internship-offers"],
    queryFn: InternshipOffersService.getOffers,
  });
};
