import { createRoute  } from "@tanstack/react-router";

import AlumnusLayout from "../pages/user/Alumnus/Internship/layout/alumnusLayout";

// Alumnus pages
import AlumnusDashboard from "../pages/user/Alumnus/Dashboard";
import AlumnusFeed from "../pages/user/Alumnus/Feed";
import AlumnusInternship from "../pages/user/Alumnus/Internship";
import AlumnusMentorship from "../pages/user/Alumnus/Mentorship";
import AlumnusEvents from "../pages/user/Alumnus/Events";
import AlumnusMessages from "../pages/user/Alumnus/Messages";
import AlumnusCalendar from "../pages/user/Alumnus/Calendar";
import AlumnusSettings from "../pages/user/Alumnus/Settings";


import { rootRoute } from "./__root";
import InternshipDetail from "@/pages/user/Alumnus/Internship/InternshipDetail";
import EditInternship from "@/pages/user/Alumnus/Internship/EditInternship";
import { requireRole } from "@/lib/guard";
import EventDetails from "@/pages/user/Alumnus/Events/EventDetails";
import CreateEvent from "@/pages/user/Alumnus/Events/CreateEvent";
import CreateInternship from "@/pages/user/Alumnus/Internship/CreateInternship";
import EditEvent from "@/pages/user/Alumnus/Events/EditEvent";


/* -------------------------- ALUMNUS ROUTES -------------------------- */
export const alumnusRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "alumnus",
  component: AlumnusLayout,
  beforeLoad: requireRole(["Alumni"]),
});
;

/* Alumnus Children */
export const alumnusDashboardRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/dashboard",
  component: AlumnusDashboard,
});

export const alumnusFeedRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/feed",
  component: AlumnusFeed,
});

// Internship Routes

export const alumnusInternshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/internships",
  component: AlumnusInternship,
});

export const alumnusCreateInternshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/internships/create-internship",
  component: CreateInternship,
});

export const alumnusInternshipDetailRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/internships/$id",
  component: InternshipDetail,
});

export const alumnusEditInternshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/internships/$id/edit",
  component: EditInternship,
});

// Mentorship Route

export const alumnusMentorshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/mentorship",
  component: AlumnusMentorship,
});

// Events Routes

export const alumnusEventsRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/events",
  component: AlumnusEvents,
});

export const alumnusEventDetailRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/events/$id",
  component: EventDetails,
});

export const alumnusCreateEventRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/events/create-event",
  component: CreateEvent,
});

export const alumnusEditEventRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/events/$id/edit-event",
  component: EditEvent,
});

// Messages Route 

export const alumnusMessagesRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/messages",
  component: AlumnusMessages,
});

export const alumnusCalendarRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/calendar",
  component: AlumnusCalendar,
});

export const alumnusSettingsRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/settings",
  component: AlumnusSettings,
});