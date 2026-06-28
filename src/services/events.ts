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

export const EventsService = {
  list: async (params?: { page?: number; size?: number }): Promise<PaginatedResponse<EventListItem>> => {
    const baseUrl = getBaseUrl()
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.size) queryParams.append('size', params.size.toString())
    
    const response = await fetch(`${baseUrl}/api/events/list?${queryParams.toString()}`, {
      method: 'GET',
      headers: getHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || 'Failed to fetch events')
    }
    return response.json()
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
    const response = await fetch(`${baseUrl}/api/events/${sqid}`, {
      method: 'GET',
      headers: getHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || 'Failed to fetch event')
    }
    return response.json()
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
    const response = await fetch(`${baseUrl}/api/events/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || 'Failed to register for event')
    }
    return response.json()
  },

  myTickets: async (params?: { page?: number; size?: number }): Promise<PaginatedResponse<PurchasedTicket>> => {
    const baseUrl = getBaseUrl()
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.size) queryParams.append('size', params.size.toString())

    const response = await fetch(`${baseUrl}/api/events/tickets?${queryParams.toString()}`, {
      method: 'GET',
      headers: getHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || 'Failed to fetch tickets')
    }
    return response.json()
  },
}


// Ensure the feed page for the alumnus is well integrated(events) and not mock stuff.




// Now I think the feed and event of the alumnus are ready somewhat.I need you to work on the student feed and events
// Consider the access and authorization of the student and build the event page, feed page and tickets.take your time, get all the details right.

// Just designs.


// help do a demo to allow the workflow fora sudent applying for a paid ticket event.need it to show that that's how source of revenue