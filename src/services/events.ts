import { api } from '@/lib/api'
import {
  CreateEventPayload,
  Event,
  EventListItem,
  PaidTicketInput,
  PurchasedTicket,
} from '@/types/event'

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface UpdateEventPayload {
  title?: string
  description?: string
  date?: string
  start_time?: string
  duration_mins?: number
  venue?: string
  max_capacity?: number
  allow_sponsorship?: boolean
  allow_donations?: boolean
  is_published?: boolean
  is_cancelled?: boolean
  redirect_after_auth?: string
}

export interface UpdateEventModePayload {
  mode: 'virtual' | 'physical' | 'hybrid'
  venue?: string
  platform?: 'meet' | 'zoom' | 'teams'
}

export interface AddTicketPayload extends PaidTicketInput {
  event: string
}

export const EventsService = {
  list: async (params?: { page?: number; size?: number }): Promise<PaginatedResponse<EventListItem>> => {
    const { data } = await api.get('/api/events/list', { params })
    return data
  },

  create: async (payload: CreateEventPayload): Promise<Event> => {
    const { data } = await api.post('/api/events/', payload)
    return data
  },

  getOne: async (sqid: string): Promise<Event> => {
    const { data } = await api.get(`/api/events/${sqid}`)
    return data
  },

  update: async (sqid: string, payload: UpdateEventPayload): Promise<Event> => {
    const { data } = await api.patch(`/api/events/update/${sqid}`, payload)
    return data
  },

  updateMode: async (sqid: string, payload: UpdateEventModePayload): Promise<Event> => {
    const { data } = await api.patch(`/api/events/update/${sqid}/mode`, payload)
    return data
  },

  addTicket: async (payload: AddTicketPayload): Promise<void> => {
    const { data } = await api.post('/api/events/ticket', payload)
    return data
  },

  register: async (payload: { ticket: string; email: string }): Promise<void> => {
    const { data } = await api.post('/api/events/register', payload)
    return data
  },

  myTickets: async (params?: { page?: number; size?: number }): Promise<PaginatedResponse<PurchasedTicket>> => {
    const { data } = await api.get('/api/events/tickets', { params })
    return data
  },
}
