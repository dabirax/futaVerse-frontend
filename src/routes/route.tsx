import { rootRoute } from "./root";
import {
  alumnusBasicRoute,
  alumnusProfessionalRoute,
  alumnusSchoolRoute,
  forgotPasswordRoute,
  landingRoute,
  lecturerBasicRoute,
  loginRoute,
  publicRoute,
  signUpRoute,
  studentBasicRoute,
} from "./public";
import {
  appRoute,
  dashboardRoute,
  feedsRoute,
  notificationsRoute,
} from "./user";

// Build full route tree
export const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([
    landingRoute,
    lecturerBasicRoute,
    loginRoute,
    signUpRoute,
    forgotPasswordRoute,
    alumnusBasicRoute,
    alumnusProfessionalRoute,
    alumnusSchoolRoute,
    studentBasicRoute,
  ]),
  appRoute.addChildren([dashboardRoute, feedsRoute, notificationsRoute]),
]);
