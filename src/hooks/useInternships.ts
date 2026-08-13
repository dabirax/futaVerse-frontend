import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  InternshipApplicationsService,
  InternshipEngagementsService,
  InternshipOffersService,
  InternshipService,
} from '@/services/internships'

// Internships

export const useInternships = () => {
  return useQuery({
    queryKey: ['internships'],
    queryFn: () => InternshipService.getAll(),
  })
}

export const useCreateInternship = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: any) => InternshipService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['internships'] })
    },
  })
}

export const useInternship = (sqid: string) => {
  return useQuery({
    queryKey: ['internship', sqid],
    queryFn: () => InternshipService.getOne(sqid),
    enabled: !!sqid,
  })
}

export const useUpdateInternship = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      InternshipService.update(id, payload),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['internships'] })
      qc.invalidateQueries({ queryKey: ['internship', variables.id] })
    },
  })
}

export const useDeleteInternship = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => InternshipService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['internships'] })
    },
  })
}

// Offers
export const useInternshipOffers = () => {
  return useQuery({
    queryKey: ['internship-offers'],
    queryFn: InternshipOffersService.getOffers,
  })
}

export const useAcceptInternshipOffer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => InternshipOffersService.acceptOffer(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['internship-offers'] })
      qc.invalidateQueries({ queryKey: ['internship-engagements'] })
    },
  })
}

export const useRejectInternshipOffer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => InternshipOffersService.rejectOffer(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['internship-offers'] })
    },
  })
}

export const useWithdrawInternshipOffer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => InternshipOffersService.withdrawOffer(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['internship-offers'] })
    },
  })
}

// Applications
export const useInternshipApplications = () => {
  return useQuery({
    queryKey: ['internship-applications'],
    queryFn: InternshipApplicationsService.getApplications,
  })
}

export const useCreateInternshipApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: {
      internship: string
      resume: string
      cover_letter?: string
    }) => InternshipApplicationsService.createApplication(payload),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['internship-applications'] })
      qc.invalidateQueries({ queryKey: ['internship-engagements'] })
      qc.invalidateQueries({
        queryKey: ['internship-engagement', variables.internship],
      })
    },
  })
}
export const useAcceptInternshipApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      InternshipApplicationsService.acceptApplication(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['internship-applications'] })
      qc.invalidateQueries({ queryKey: ['internship-engagements'] })
    },
  })
}

export const useRejectInternshipApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      InternshipApplicationsService.rejectApplication(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['internship-applications'] })
    },
  })
}

export const useWithdrawInternshipApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      InternshipApplicationsService.withdrawApplication(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['internship-applications'] })
    },
  })
}

// Engagements
export const useInternshipEngagements = () => {
  return useQuery({
    queryKey: ['internship-engagements'],
    queryFn: InternshipEngagementsService.getAll,
  })
}

export const useInternshipEngagement = (sqid: string) => {
  return useQuery({
    queryKey: ['internship-engagement', sqid],
    queryFn: () => InternshipEngagementsService.getOne(sqid),
    enabled: !!sqid,
  })
}
