import { createRoute  } from "@tanstack/react-router";

import StudentLayout from "../pages/user/Student/layout/studentLayout";

// Student pages
import StudentDashboard from "../pages/user/Student/Dashboard";
import StudentFeed from "../pages/user/Student/Feed";
import StudentInternship from "../pages/user/Student/Internship";
import StudentMentorship from "../pages/user/Student/Mentorship";
import StudentEvents from "../pages/user/Student/Events";
import StudentMessages from "../pages/user/Student/Messages";
import StudentCalendar from "../pages/user/Student/Calendar";
import StudentSettings from "../pages/user/Student/Settings";


import { rootRoute } from "./__root";
import { requireAuth, requireRole} from "@/lib/guard";



/* -------------------------- STUDENT ROUTES -------------------------- */
export const studentRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "student",
  component: StudentLayout, 
    beforeLoad: requireRole(["Student"]),
  
});

/* Student Children */
export const studentDashboardRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/student/dashboard",
    component: StudentDashboard,
  
});

export const studentFeedRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/student/feed",
  component: StudentFeed,
});

export const studentInternshipRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/student/internships",
  component: StudentInternship,
});

export const studentMentorshipRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/student/mentorship",
  component: StudentMentorship,
});

export const studentEventsRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/student/events",
  component: StudentEvents,
});

export const studentMessagesRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/student/messages",
  component: StudentMessages,
});

export const studentCalendarRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/student/calendar",
  component: StudentCalendar,
});

export const studentSettingsRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/student/settings",
  component: StudentSettings,
});



