import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  AddTicketPayload,
  EventsService,
  UpdateEventModePayload,
  UpdateEventPayload,
} from '@/services/events'
import { CreateEventPayload } from '@/types/event'

export const useHostedEvents = (params?: { page?: number; size?: number }) => {
  return useQuery({
    queryKey: ['hosted-events', params],
    queryFn: () => EventsService.list(params),
  })
}

export const useEvent = (sqid: string) => {
  return useQuery({
    queryKey: ['event', sqid],
    queryFn: () => EventsService.getOne(sqid),
    enabled: !!sqid,
  })
}

export const useCreateEvent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateEventPayload) => EventsService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['hosted-events'] })
    },
  })
}

export const useUpdateEvent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ sqid, payload }: { sqid: string; payload: UpdateEventPayload }) =>
      EventsService.update(sqid, payload),
    onSuccess: (_, { sqid }) => {
      qc.invalidateQueries({ queryKey: ['hosted-events'] })
      qc.invalidateQueries({ queryKey: ['event', sqid] })
    },
  })
}

export const useUpdateEventMode = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ sqid, payload }: { sqid: string; payload: UpdateEventModePayload }) =>
      EventsService.updateMode(sqid, payload),
    onSuccess: (_, { sqid }) => {
      qc.invalidateQueries({ queryKey: ['hosted-events'] })
      qc.invalidateQueries({ queryKey: ['event', sqid] })
    },
  })
}

export const useAddEventTicket = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: AddTicketPayload) => EventsService.addTicket(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['hosted-events'] })
      qc.invalidateQueries({ queryKey: ['event'] })
    },
  })
}

export const useRegisterEvent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: { ticket: string; email: string }) => EventsService.register(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-tickets'] })
      qc.invalidateQueries({ queryKey: ['my-tickets-with-events'] })
      qc.invalidateQueries({ queryKey: ['event'] })
    },
  })
}

export const useMyTickets = (params?: { page?: number; size?: number }) => {
  return useQuery({
    queryKey: ['my-tickets', params],
    queryFn: () => EventsService.myTickets(params),
  })
}

/** Fetches purchased tickets and joins each with its event details. */
export const useMyTicketsWithEvents = () => {
  return useQuery({
    queryKey: ['my-tickets-with-events'],
    queryFn: async () => {
      const { results } = await EventsService.myTickets()
      const uniqueSqids = [...new Set(results.map((r) => r.ticket.event))]
      const events = await Promise.all(uniqueSqids.map((sqid) => EventsService.getOne(sqid)))
      const eventMap = Object.fromEntries(events.map((e) => [e.sqid, e]))
      return results.map((r) => ({ ...r, event: eventMap[r.ticket.event] }))
    },
  })
}
