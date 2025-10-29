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
  appRoute.addChildren([dashboardRoute, feedsRoute, notificationsRoute]),
]);
