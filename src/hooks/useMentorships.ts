import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  MentorshipApplicationsService,
  MentorshipEngagementsService,
  MentorshipOffersService,
  MentorshipService,
} from '@/services/mentorship'
// Internships

export const useMentorships = () => {
  return useQuery({
    queryKey: ['mentorships'],
    queryFn: () => MentorshipService.getAll(),
  })
}

export const useCreateMentorship = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: any) => MentorshipService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship s'] })
    },
  })
}

export const useMentorship = (id: number) => {
  return useQuery({
    queryKey: ['mentorship', id],
    queryFn: () => MentorshipService.getOne(id),
    enabled: !!id,
  })
}

export const useUpdateMentorship = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      MentorshipService.update(id, payload),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['mentorships'] })
      qc.invalidateQueries({ queryKey: ['mentorship', variables.id] })
    },
  })
}

export const useDeleteMentorship = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => MentorshipService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorships'] })
    },
  })
}

// Offers
export const useMentorshipOffers = () => {
  return useQuery({
    queryKey: ['mentorship-offers'],
    queryFn: MentorshipOffersService.getOffers,
  })
}

export const useAcceptMentorshipOffer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => MentorshipOffersService.acceptOffer(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-offers'] })
    },
  })
}

export const useRejectMentorshipOffer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => MentorshipOffersService.rejectOffer(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-offers'] })
    },
  })
}

export const useWithdrawMentorshipOffer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => MentorshipOffersService.withdrawOffer(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-offers'] })
    },
  })
}

// Applications
export const useMentorshipApplications = () => {
  return useQuery({
    queryKey: ['mentorship-applications'],
    queryFn: MentorshipApplicationsService.getApplications,
  })
}

export const useCreateMentorshipApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: any) =>
      MentorshipApplicationsService.createApplication(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-applications'] })
    },
  })
}

export const useAcceptMentorshipApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      MentorshipApplicationsService.acceptApplication(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-applications'] })
    },
  })
}

export const useRejectMentorshipApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      MentorshipApplicationsService.rejectApplication(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-applications'] })
    },
  })
}

export const useWithdrawMentorshipApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      MentorshipApplicationsService.withdrawApplication(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-applications'] })
    },
  })
}

// Engagements
export const useMentorshipEngagements = () => {
  return useQuery({
    queryKey: ['mentorship-engagements'],
    queryFn: MentorshipEngagementsService.getEngagements,
  })
}
