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
import NewInternship from "@/pages/user/Alumnus/Internship/NewInternship";
import EditInternship from "@/pages/user/Alumnus/Internship/EditInternship";
import { requireRole } from "@/lib/guard";


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

export const alumnusInternshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/internships",
  component: AlumnusInternship,
});

export const createInternshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/internships/create-internship",
  component: NewInternship,
});

export const internshipDetailRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/internships/$id",
  component: InternshipDetail,
});

export const editInternshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/internships/$id/edit",
  component: EditInternship,
});



export const alumnusMentorshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/mentorship",
  component: AlumnusMentorship,
});

export const alumnusEventsRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/events",
  component: AlumnusEvents,
});

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