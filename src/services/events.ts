import type {
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
import { fetchWithAuth } from '@/lib/api'

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: Array<T>
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

export interface RegisterResponse {
  checkout_url?: string
  message?: string
}

export class EventApiError extends Error {
  authUrl?: string

  constructor(message: string, authUrl?: string) {
    super(message)
    this.name = 'EventApiError'
    this.authUrl = authUrl
  }
}

const extractAuthUrl = (data: unknown): string | undefined => {
  if (!data || typeof data !== 'object') return undefined
  const url = (data as Record<string, unknown>).auth_url
  return typeof url === 'string' ? url : undefined
}

const getBaseUrl = () => import.meta.env.VITE_API_URL || ''
const mockTicketCache: Array<PurchasedTicket> = [...mockPurchasedTickets]

const flattenFieldErrors = (value: unknown, prefix = ''): string => {
  if (typeof value === 'string') return prefix ? `${prefix}: ${value}` : value
  if (Array.isArray(value)) {
    return value
      .map((item) => flattenFieldErrors(item, prefix))
      .filter(Boolean)
      .join('\n')
  }
  if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, item]) =>
        flattenFieldErrors(item, prefix ? `${prefix}.${key}` : key),
      )
      .filter(Boolean)
      .join('\n')
  }
  return ''
}

const extractErrorMessage = (data: unknown, fallback: string): string => {
  if (!data || typeof data !== 'object') return fallback
  const obj = data as Record<string, unknown>

  if (typeof obj.detail === 'string') {
    const authUrl = typeof obj.auth_url === 'string' ? `\n${obj.auth_url}` : ''
    return `${obj.detail}${authUrl}`
  }
  if (
    Array.isArray(obj.detail) ||
    (obj.detail && typeof obj.detail === 'object')
  ) {
    const detailText = flattenFieldErrors(obj.detail)
    if (detailText) return detailText
  }
  if (typeof obj.message === 'string') return obj.message
  if (typeof obj.error === 'string') return obj.error

  const fieldText = flattenFieldErrors(obj)
  return fieldText || fallback
}

export const EventsService = {
  list: async (params?: {
    page?: number
    size?: number
  }): Promise<PaginatedResponse<EventListItem>> => {
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

    const response = await fetchWithAuth(
      `${baseUrl}/api/events/list?${queryParams.toString()}`,
      { method: 'GET' },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(extractErrorMessage(errorData, 'Failed to fetch events'))
    }
    return response.json()
  },

  create: async (payload: CreateEventPayload): Promise<Event> => {
    const baseUrl = getBaseUrl()
    const response = await fetchWithAuth(`${baseUrl}/api/events/`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new EventApiError(
        extractErrorMessage(errorData, 'Failed to create event'),
        extractAuthUrl(errorData),
      )
    }
    return response.json()
  },

  getOne: async (sqid: string): Promise<Event> => {
    const baseUrl = getBaseUrl()
    if (!baseUrl) {
      const fallback = mockEvents.find((event) => event.sqid === sqid)
      if (!fallback) {
        throw new Error('Event not found')
      }
      return fallback
    }

    const response = await fetchWithAuth(`${baseUrl}/api/events/${sqid}`, {
      method: 'GET',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(extractErrorMessage(errorData, 'Failed to fetch event'))
    }
    return response.json()
  },

  update: async (sqid: string, payload: UpdateEventPayload): Promise<Event> => {
    const baseUrl = getBaseUrl()
    const response = await fetchWithAuth(
      `${baseUrl}/api/events/update/${sqid}`,
      {
        method: 'PATCH',
        body: JSON.stringify(payload),
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new EventApiError(
        extractErrorMessage(errorData, 'Failed to update event'),
        extractAuthUrl(errorData),
      )
    }
    return response.json()
  },

  updateMode: async (
    sqid: string,
    payload: UpdateEventModePayload,
  ): Promise<Event> => {
    const baseUrl = getBaseUrl()
    const response = await fetchWithAuth(
      `${baseUrl}/api/events/update/${sqid}/mode`,
      {
        method: 'PATCH',
        body: JSON.stringify(payload),
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new EventApiError(
        extractErrorMessage(errorData, 'Failed to update event mode'),
        extractAuthUrl(errorData),
      )
    }
    return response.json()
  },

  addTicket: async (payload: AddTicketPayload): Promise<void> => {
    const baseUrl = getBaseUrl()
    const response = await fetchWithAuth(`${baseUrl}/api/events/ticket`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(extractErrorMessage(errorData, 'Failed to add ticket'))
    }
    return response.json()
  },

  register: async (payload: {
    ticket: string
    email: string
  }): Promise<RegisterResponse> => {
    const baseUrl = getBaseUrl()

    if (!baseUrl) {
      const ticket = mockEvents
        .flatMap((event) => event.tickets ?? [])
        .find((item) => item.sqid === payload.ticket)

      if (!ticket) {
        throw new Error('Ticket not found')
      }

      mockTicketCache.push({
        email: payload.email,
        ticket,
        ticket_uid:
          typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `mock-${Date.now()}`,
        is_paid: true,
        checked_in: false,
        checked_in_at: null,
      })
      return { message: 'ok' }
    }

    const response = await fetchWithAuth(`${baseUrl}/api/events/register`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        extractErrorMessage(errorData, 'Failed to register for event'),
      )
    }
    return response.json()
  },

  myTickets: async (params?: {
    page?: number
    size?: number
  }): Promise<PaginatedResponse<PurchasedTicket>> => {
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

    const response = await fetchWithAuth(
      `${baseUrl}/api/events/tickets?${queryParams.toString()}`,
      { method: 'GET' },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(extractErrorMessage(errorData, 'Failed to fetch tickets'))
    }
    return response.json()
  },
}
