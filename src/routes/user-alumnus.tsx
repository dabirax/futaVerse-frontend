import { createRoute } from '@tanstack/react-router'

import AlumnusLayout from '../pages/user/Alumnus/layout/alumnusLayout'

// Alumnus pages
import AlumnusFeed from '../pages/user/Alumnus/Feed'
import AlumnusInternship from '../pages/user/Alumnus/Internship'
import AlumnusMentorship from '../pages/user/Alumnus/Mentorship'
import AlumnusEvents from '../pages/user/Alumnus/Events'
import AlumnusMessages from '../pages/user/Alumnus/Messages'
import AlumnusCalendar from '../pages/user/Alumnus/Calendar'
import AlumnusSettings from '../pages/user/Alumnus/Settings'
import AlumnusAnalytics from '../pages/user/Alumnus/Analytics'

import { rootRoute } from './__root'
import { publicRoute } from './public'
import InternshipDetail from '@/pages/user/Alumnus/Internship/InternshipDetail'
import EditInternship from '@/pages/user/Alumnus/Internship/EditInternship'
import { requireRole } from '@/lib/guard'
import EventDetails from '@/pages/user/Alumnus/Events/EventDetails'
import CreateEvent from '@/pages/user/Alumnus/Events/CreateEvent'
import CreateInternship from '@/pages/user/Alumnus/Internship/CreateInternship'
import EditEvent from '@/pages/user/Alumnus/Events/EditEvent'
import CreateMentorship from '@/pages/user/Alumnus/Mentorship/create'
import EditMentorship from '@/pages/user/Alumnus/Mentorship/edit'
import MentorshipDetails from '@/pages/user/Alumnus/Mentorship/details'
import AlumnusTickets from '@/pages/user/Alumnus/Tickets'
import ManageEventTickets from '@/pages/user/Alumnus/Events/ManageEventTickets'

/* -------------------------- ALUMNUS ROUTES -------------------------- */
export const alumnusRoute = createRoute({
  getParentRoute: () => rootRoute,

  // getParentRoute: () => publicRoute,
  id: 'alumnus',
  component: AlumnusLayout,
  beforeLoad: requireRole(['Alumni']),
})

/* Alumnus Children */

export const alumnusFeedRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/feed',
  component: AlumnusFeed,
})

// Internship Routes

export const alumnusInternshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/internships',
  component: AlumnusInternship,
})

export const alumnusCreateInternshipRoute = createRoute({
  // getParentRoute: () => alumnusRoute,
  getParentRoute: () => publicRoute,
  path: '/alumnus/internships/create',
  component: CreateInternship,
})

export const alumnusInternshipDetailRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/internships/$sqid',
  component: InternshipDetail,
})

export const alumnusEditInternshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/internships/$sqid/edit',
  component: EditInternship,
})

// Mentorship Route

export const alumnusMentorshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/mentorships',
  component: AlumnusMentorship,
})

export const alumnusCreateMentorshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/mentorship/create',
  component: CreateMentorship,
})

export const alumnusEditMentorshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/mentorships/$sqid/edit',
  component: EditMentorship,
})

export const alumnusMentorshipDetailRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/mentorships/$sqid',
  component: MentorshipDetails,
})

// Events Routes

export const alumnusEventsRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/events',
  component: AlumnusEvents,
})

export const alumnusEventDetailRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/events/$id',
  component: EventDetails,
})

export const alumnusCreateEventRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/events/create',
  component: CreateEvent,
})

export const alumnusEditEventRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/events/$id/edit',
  component: EditEvent,
})

export const alumnusEventTicket = createRoute({
  getParentRoute: () => alumnusRoute,
  path: '/alumnus/events/$id/ticket',
  component: EventDetails,
})

export const alumnusEventTicketManager = createRoute({
  getParentRoute: () => alumnusRoute,
  path: '/alumnus/events/tickets',
  component: ManageEventTickets,
})

//Tickets Section
export const alumnusTicketsRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: '/alumnus/tickets',
  component: AlumnusTickets,
})

// Messages Route

export const alumnusMessagesRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/messages',
  component: AlumnusMessages,
})

export const alumnusCalendarRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/calendar',
  component: AlumnusCalendar,
})

export const alumnusSettingsRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/settings',
  component: AlumnusSettings,
})

export const alumnusAnalyticsRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  // getParentRoute: () => publicRoute,
  path: '/alumnus/analytics',
  component: AlumnusAnalytics,
})
