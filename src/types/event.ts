export interface Ticket {
  sqid: string
  event: string
  name: string
  description: string
  price: string
  sales_price: string
  discount_perc: string
  quantity: number
  quantity_sold: number
  type: 'default' | 'vip' | 'early_bird'
  sales_start: string
  sales_end: string
  is_active: boolean
  created_at: string
}

export interface VirtualMeeting {
  sqid: string
  platform: 'meet' | 'zoom' | 'teams'
  join_url: string
  room_name: string
}

export interface Event {
  sqid: string
  title: string
  description: string
  category:
    | 'workshop'
    | 'seminar'
    | 'networking'
    | 'career_fair'
    | 'webinar'
    | 'conference'
  mode: 'virtual' | 'physical' | 'hybrid'
  venue: string
  date: string
  start_time: string
  duration_mins: number
  max_capacity: number
  allow_sponsorship: boolean
  allow_donations: boolean
  is_cancelled: boolean
  is_published: boolean
  created_at: string
  updated_at: string
  creator: number
  tickets?: Ticket[]
  virtual_meeting?: VirtualMeeting
  starting_price?: string
}

export interface EventListItem {
  sqid: string
  title: string
  description: string
  category: Event['category']
  mode: Event['mode']
  venue: string
  date: string
  start_time: string
  duration_mins: number
  max_capacity: number
  allow_sponsorship: boolean
  allow_donations: boolean
  is_cancelled: boolean
  is_published: boolean
  created_at: string
  updated_at: string
  virtual_meeting?: VirtualMeeting
  starting_price?: string
}

export interface PurchasedTicket {
  email: string
  ticket: Ticket
  ticket_uid: string
  is_paid: boolean
  checked_in: boolean
  checked_in_at: string | null
}

/** Free-ticket configuration on the event payload. */
export interface FreeTicketConfig {
  required: boolean
  quantity: number
}

/** A paid ticket variation as sent to POST /api/events/. No `type` field per latest schema. */
export interface PaidTicketInput {
  name: string
  description: string
  price: string
  discount_perc?: string
  quantity: number
  sales_start: string
  sales_end: string
  is_active: boolean
}

export interface CreateEventPayload {
  title: string
  description: string
  category: Event['category']
  mode: Event['mode']
  venue: string
  date: string
  start_time: string
  duration_mins: number
  max_capacity: number
  allow_sponsorship: boolean
  allow_donations: boolean
  is_published: boolean
  platform?: VirtualMeeting['platform']
  redirect_after_auth?: string
  free_ticket?: FreeTicketConfig
  tickets?: PaidTicketInput[]
}

/** Paystack bank entry returned from GET /api/payments/banks. */
export interface PaystackBank {
  code: string
  name: string
  slug?: string
}

/** Linked Paystack subaccount on the alumnus profile. */
export interface LinkedBankAccount {
  bank_code: string
  bank_name: string
  account_number: string
  account_name: string
}
