import {
  CreateEventPayload,
  Event,
  EventListItem,
  PaidTicketInput,
  PurchasedTicket,
} from '@/types/event'
import {
  mockEventListItems,
  mockEvents,
  mockPurchasedTickets,
} from '@/data/mockEvents'

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

const getHeaders = (): Record<string, string> => {
  const token = sessionStorage.getItem('access_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

const getBaseUrl = () => import.meta.env.VITE_API_URL || ''
const mockTicketCache: PurchasedTicket[] = [...mockPurchasedTickets]

export const EventsService = {
  list: async (params?: { page?: number; size?: number }): Promise<PaginatedResponse<EventListItem>> => {
    const baseUrl = getBaseUrl()
    if (!baseUrl) {
      return {
        count: mockEventListItems.length,
        next: null,
        previous: null,
        results: mockEventListItems,
      }
    }

    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.size) queryParams.append('size', params.size.toString())

    try {
      const response = await fetch(`${baseUrl}/api/events/list?${queryParams.toString()}`, {
        method: 'GET',
        headers: getHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      return response.json()
    } catch {
      return {
        count: mockEventListItems.length,
        next: null,
        previous: null,
        results: mockEventListItems,
      }
    }
  },

  create: async (payload: CreateEventPayload): Promise<Event> => {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/events/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || 'Failed to create event')
    }
    return response.json()
  },

  getOne: async (sqid: string): Promise<Event> => {
    const baseUrl = getBaseUrl()
    const fallback = mockEvents.find((event) => event.sqid === sqid)
    if (!baseUrl) {
      if (!fallback) {
        throw new Error('Event not found')
      }
      return fallback
    }

    try {
      const response = await fetch(`${baseUrl}/api/events/${sqid}`, {
        method: 'GET',
        headers: getHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch event')
      }
      return response.json()
    } catch {
      if (!fallback) {
        throw new Error('Event not found')
      }
      return fallback
    }
  },

  update: async (sqid: string, payload: UpdateEventPayload): Promise<Event> => {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/events/update/${sqid}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))  
      throw new Error(errorData?.message || 'Failed to update event')
    }
    return response.json()
  },

  updateMode: async (sqid: string, payload: UpdateEventModePayload): Promise<Event> => {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/events/update/${sqid}/mode`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || 'Failed to update event mode')
    }
    return response.json()
  },

  addTicket: async (payload: AddTicketPayload): Promise<void> => {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/events/ticket`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || 'Failed to add ticket')
    }
    return response.json()
  },

  register: async (payload: { ticket: string; email: string }): Promise<void> => {
    const baseUrl = getBaseUrl()

    const ticket = mockEvents
      .flatMap((event) => event.tickets ?? [])
      .find((item) => item.sqid === payload.ticket)

    if (!ticket) {
      throw new Error('Ticket not found')
    }

    if (!baseUrl) {
      mockTicketCache.push({
        email: payload.email,
        ticket,
        ticket_uid: typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `mock-${Date.now()}`,
        is_paid: true,
        checked_in: false,
        checked_in_at: null,
      })
      return Promise.resolve()
    }

    try {
      const response = await fetch(`${baseUrl}/api/events/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to register for event')
      }
      return response.json()
    } catch {
      mockTicketCache.push({
        email: payload.email,
        ticket,
        ticket_uid: typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `mock-${Date.now()}`,
        is_paid: true,
        checked_in: false,
        checked_in_at: null,
      })
      return Promise.resolve()
    }
  },

  myTickets: async (params?: { page?: number; size?: number }): Promise<PaginatedResponse<PurchasedTicket>> => {
    const baseUrl = getBaseUrl()
    if (!baseUrl) {
      return {
        count: mockTicketCache.length,
        next: null,
        previous: null,
        results: mockTicketCache,
      }
    }

    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.size) queryParams.append('size', params.size.toString())

    try {
      const response = await fetch(`${baseUrl}/api/events/tickets?${queryParams.toString()}`, {
        method: 'GET',
        headers: getHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch tickets')
      }
      return response.json()
    } catch {
      return {
        count: mockTicketCache.length,
        next: null,
        previous: null,
        results: mockTicketCache,
      }
    }
  },
}