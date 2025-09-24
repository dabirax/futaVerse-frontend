import {  Outlet, createRoute } from "@tanstack/react-router";
import Landing from "../pages/landing";
import Login from "../pages/onboarding/Login";
import SignUp from "../pages/onboarding/SignUp";
import ForgotPassword from "../pages/onboarding/ForgotPassword";
import { rootRoute } from "./root";

// Public parent route (no auth required)
export const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: () => <Outlet />,
});

export const landingRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/",
  component: Landing,
});

export const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/login",
  component: Login,
});

export const signUpRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/signup",
  component: SignUp,
});

export const forgotPasswordRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/forgot-password",
  component: ForgotPassword,
});
