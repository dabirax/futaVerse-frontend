import { rootRoute } from "./__root";
import {
  alumnusBasicRoute,
  alumnusProfessionalRoute,
  alumnusSchoolRoute,
  checkEmailRoute,
  forgotPasswordRoute,
  landingRoute,
  lecturerBasicRoute,
  loginRoute,
  publicRoute,
  resetPasswordRoute,
  resetSuccessRoute,
  signUpRoute,
  signupOTPRoute,
  signupSuccessRoute,
  studentBasicRoute,
  studentProfessionalRoute,
  studentSchoolRoute
} from "./public";
import {
  alumnusCalendarRoute,
  alumnusCreateInternshipRoute,
  alumnusDashboardRoute,
  alumnusEventsRoute, 
  alumnusEventDetailRoute,
  alumnusFeedRoute,
  alumnusInternshipRoute,
  alumnusMentorshipRoute,
  alumnusMessagesRoute,
  alumnusRoute, 
  alumnusSettingsRoute,
  alumnusEditInternshipRoute,
  alumnusInternshipDetailRoute,
  alumnusCreateEventRoute,
  alumnusEditEventRoute,
  alumnusMentorshipDetailRoute,
  alumnusEditMentorshipRoute,
  alumnusCreateMentorshipRoute
} from "./user-alumnus";
import { 
studentCalendarRoute,
  studentDashboardRoute,
  studentEventsRoute,
studentFeedRoute,
  studentInternshipDetailsRoute,
  studentInternshipRoute,
  studentMentorshipDetailRoute,
  studentMentorshipRoute,
  studentMessagesRoute,
  studentRoute,
  studentSettingsRoute } from "./user-student";

// Build full route tree
export const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([
    landingRoute,
    lecturerBasicRoute,
    loginRoute,
    signUpRoute,
    signupSuccessRoute,
    signupOTPRoute,
    forgotPasswordRoute,
    alumnusBasicRoute,
    alumnusProfessionalRoute,
    alumnusSchoolRoute,
    studentBasicRoute,
    studentSchoolRoute,
    studentProfessionalRoute,
    resetPasswordRoute,
    resetSuccessRoute,
    checkEmailRoute
  ]),
  alumnusRoute.addChildren([alumnusDashboardRoute, alumnusFeedRoute, alumnusMentorshipRoute, alumnusMessagesRoute, alumnusCalendarRoute, alumnusSettingsRoute, alumnusInternshipRoute, alumnusEventsRoute, alumnusEventDetailRoute, alumnusCreateEventRoute, alumnusCreateInternshipRoute, alumnusEditInternshipRoute, alumnusInternshipDetailRoute, alumnusEditEventRoute, alumnusCreateMentorshipRoute, alumnusEditMentorshipRoute, alumnusMentorshipDetailRoute]),
  studentRoute.addChildren([studentDashboardRoute, studentFeedRoute, studentInternshipRoute, studentMentorshipRoute, studentMessagesRoute, studentCalendarRoute, studentSettingsRoute, studentEventsRoute, studentInternshipDetailsRoute, studentMentorshipDetailRoute])
]);
