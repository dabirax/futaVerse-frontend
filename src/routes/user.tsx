import { createRoute, redirect } from "@tanstack/react-router";

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

/* -------------------------- ALUMNUS ROUTES -------------------------- */
export const alumnusRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "alumnus",
  component: AlumnusLayout,
});

// Utility guard
const requireAuth = ({ context }: any) => {
  if (!context.auth.isLoggedIn) {
    throw redirect({ to: "/login" });
  }
};

/* Alumnus Children */
export const alumnusDashboardRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/dashboard",
  beforeLoad: requireAuth,
  component: AlumnusDashboard,
});

export const alumnusFeedRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/feed",
  beforeLoad: requireAuth,
  component: AlumnusFeed,
});

export const alumnusInternshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/internships",
  beforeLoad: requireAuth,
  component: AlumnusInternship,
});

export const internshipDetailRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/internships/$id",
  beforeLoad: requireAuth,
  component: InternshipDetail,
});

export const alumnusMentorshipRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/mentorship",
  beforeLoad: requireAuth,
  component: AlumnusMentorship,
});

export const alumnusEventsRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/events",
  beforeLoad: requireAuth,
  component: AlumnusEvents,
});

export const alumnusMessagesRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/messages",
  beforeLoad: requireAuth,
  component: AlumnusMessages,
});

export const alumnusCalendarRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/calendar",
  beforeLoad: requireAuth,
  component: AlumnusCalendar,
});

export const alumnusSettingsRoute = createRoute({
  getParentRoute: () => alumnusRoute,
  path: "/alumnus/settings",
  beforeLoad: requireAuth,
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
