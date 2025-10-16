import { createRoute, redirect } from "@tanstack/react-router";
import userLayout from "../layout/userLayout";
import Dashboard from "../pages/user/Dashboard";
import Feeds from "../pages/user/Feeds";
import Notification from "../pages/user/Notification";
import { rootRoute } from "./__root";

// Protected parent route (all children require auth)
export const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: userLayout,
});

// Child: Dashboard
export const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/dashboard",
  beforeLoad: ({ context }) => {
    if (!context.auth.isLoggedIn) {
      throw redirect({ to: "/login" });
    }
  },
  component: Dashboard,
});

// Child: Feeds
export const feedsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/feeds",
  beforeLoad: ({ context }) => {
    if (!context.auth.isLoggedIn) {
      throw redirect({ to: "/login" });
    }
  },
  component: Feeds,
});

// Child: Notifications
export const notificationsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/notifications",
  beforeLoad: ({ context }) => {
    if (!context.auth.isLoggedIn) {
      throw redirect({ to: "/login" });
    }
  },
  component: Notification,
});
