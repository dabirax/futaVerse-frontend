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
import { requireRole} from "@/lib/guard";
import MentorshipDetails from "@/pages/user/Student/Mentorship/details";
import InternshipDetail from "@/pages/user/Student/Internship/InternshipDetail";
import EventDetails from "@/pages/user/Student/Events/EventDetails";



/* -------------------------- STUDENT ROUTES -------------------------- */
export const studentRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'student',
  component: StudentLayout,
  beforeLoad: requireRole(['student']),
  notFoundComponent: () => <div>Page Not Found</div>,
})

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

// Internship Routes

export const studentInternshipRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/student/internships",
  component: StudentInternship,
});

export const studentInternshipDetailsRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/student/internships/$sqid",
  component: InternshipDetail,
});


// Mentorship Routes

export const studentMentorshipRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: '/student/mentorships',
  component: StudentMentorship,
  notFoundComponent: () => <div>Page Not Found</div>,
})


export const studentMentorshipDetailRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: '/student/mentorships/$sqid',
  component: MentorshipDetails,
  notFoundComponent: () => <div>Page Not Found</div>,
}) 

// Events Routes

export const studentEventsRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/student/events",
  component: StudentEvents,
});

export const studentEventDetailRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/student/events/$sqid",
  component: EventDetails,
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



