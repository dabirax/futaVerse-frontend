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
      qc.invalidateQueries({ queryKey: ['mentorships'] })
    },
  })
}

export const useMentorshipChoices = () => {
  return useQuery({
    queryKey: ['mentorship-choices'],
    queryFn: MentorshipService.getChoices,
  })
}

export const useToggleMentorshipActive = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ sqid, is_active }: { sqid: string; is_active: boolean }) =>
      MentorshipService.toggleActive(sqid, is_active),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorships'] })
    },
  })
}

export const useMentorship = (sqid: string) => {
  return useQuery({
    queryKey: ['mentorship', sqid],
    queryFn: () => MentorshipService.getOne(sqid),
    enabled: !!sqid,
  })
}

export const useUpdateMentorship = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ sqid, payload }: { sqid: string; payload: any }) =>
      MentorshipService.update(sqid, payload),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['mentorships'] })
      qc.invalidateQueries({ queryKey: ['mentorship', variables.sqid] })
    },
  })
}

export const useDeleteMentorship = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (sqid: string) => MentorshipService.delete(sqid),
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

export const useCreateMentorshipOffer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: any) => MentorshipOffersService.createOffer(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-offers'] })
    },
  })
}

export const useAcceptMentorshipOffer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (sqid: string) => MentorshipOffersService.acceptOffer(sqid),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-offers'] })
      qc.invalidateQueries({ queryKey: ['mentorship-engagements'] })
    },
  })
}

export const useRejectMentorshipOffer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (sqid: string) => MentorshipOffersService.rejectOffer(sqid),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-offers'] })
    },
  })
}

export const useWithdrawMentorshipOffer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (sqid: string) => MentorshipOffersService.withdrawOffer(sqid),
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
      qc.invalidateQueries({ queryKey: ['mentorship-engagements'] })
    },
  })
}

export const useAcceptMentorshipApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (sqid: string) =>
      MentorshipApplicationsService.acceptApplication(sqid),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-applications'] })
      qc.invalidateQueries({ queryKey: ['mentorship-engagements'] })
    },
  })
}

export const useRejectMentorshipApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (sqid: string) =>
      MentorshipApplicationsService.rejectApplication(sqid),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-applications'] })
    },
  })
}

export const useWithdrawMentorshipApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (sqid: string) =>
      MentorshipApplicationsService.withdrawApplication(sqid),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mentorship-applications'] })
    },
  })
}

// Engagements
export const useMentorshipEngagements = () => {
  return useQuery({
    queryKey: ['mentorship-engagements'],
    queryFn: MentorshipEngagementsService.getAll,
  })
}

export const useMentorshipEngagement = (sqid: string) => {
  return useQuery({
    queryKey: ['mentorship-engagement', sqid],
    queryFn: () => MentorshipEngagementsService.getOne(sqid),
    enabled: !!sqid,
  })
}
