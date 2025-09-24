import { rootRoute } from "./root";
import {
  forgotPasswordRoute,
  landingRoute,
  loginRoute,
  publicRoute,
  signUpRoute,
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
    loginRoute,
    signUpRoute,
    forgotPasswordRoute,
  ]),
  appRoute.addChildren([dashboardRoute, feedsRoute, notificationsRoute]),
]);
