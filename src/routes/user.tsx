import { createRoute  } from "@tanstack/react-router";

// Layouts
import AlumnusLayout from "../pages/user/Alumnus/layout/alumnusLayout";
// import StudentLayout from "../pages/student/layout/StudentLayout";

// Alumnus pages
import AlumnusDashboard from "../pages/user/Alumnus/Dashboard";
import AlumnusFeed from "../pages/user/Alumnus/Feed";
import AlumnusInternship from "../pages/user/Alumnus/Internship";
import AlumnusMentorship from "../pages/user/Alumnus/Mentorship";
import AlumnusEvents from "../pages/user/Alumnus/Events";
import AlumnusMessages from "../pages/user/Alumnus/Messages";
import AlumnusCalendar from "../pages/user/Alumnus/Calendar";
import AlumnusSettings from "../pages/user/Alumnus/Settings";



// Student pages
// import StudentDashboard from "../pages/student/Dashboard";
// import StudentFeed from "../pages/student/Feed";
// import StudentInternship from "../pages/student/Internship";
// import StudentMentorship from "../pages/student/Mentorship";
// import StudentEvents from "../pages/student/Events";
// import StudentMessages from "../pages/student/Messages";
// import StudentCalendar from "../pages/student/Calendar";
// import StudentSettings from "../pages/student/Settings";
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

/* -------------------------- STUDENT ROUTES -------------------------- */
// export const studentRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   id: "student",
//   component: StudentLayout,
// });

// /* Student Children */
// export const studentDashboardRoute = createRoute({
//   getParentRoute: () => studentRoute,
//   path: "/student/dashboard",
//   beforeLoad: requireAuth,
//   component: StudentDashboard,
// });

// export const studentFeedRoute = createRoute({
//   getParentRoute: () => studentRoute,
//   path: "/student/feed",
//   beforeLoad: requireAuth,
//   component: StudentFeed,
// });

// export const studentInternshipRoute = createRoute({
//   getParentRoute: () => studentRoute,
//   path: "/student/internships",
//   beforeLoad: requireAuth,
//   component: StudentInternship,
// });

// export const studentMentorshipRoute = createRoute({
//   getParentRoute: () => studentRoute,
//   path: "/student/mentorship",
//   beforeLoad: requireAuth,
//   component: StudentMentorship,
// });

// export const studentEventsRoute = createRoute({
//   getParentRoute: () => studentRoute,
//   path: "/student/events",
//   beforeLoad: requireAuth,
//   component: StudentEvents,
// });

// export const studentMessagesRoute = createRoute({
//   getParentRoute: () => studentRoute,
//   path: "/student/messages",
//   beforeLoad: requireAuth,
//   component: StudentMessages,
// });

// export const studentCalendarRoute = createRoute({
//   getParentRoute: () => studentRoute,
//   path: "/student/calendar",
//   beforeLoad: requireAuth,
//   component: StudentCalendar,
// });

// export const studentSettingsRoute = createRoute({
//   getParentRoute: () => studentRoute,
//   path: "/student/settings",
//   beforeLoad: requireAuth,
//   component: StudentSettings,
// });
