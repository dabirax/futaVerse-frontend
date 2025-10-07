import {  Outlet, createRoute } from "@tanstack/react-router";
import Landing from "../pages/landing";
import Login from "../pages/onboarding/Login";
import SignUp from "../pages/onboarding/SignUp";
import ForgotPassword from "../pages/onboarding/ForgotPassword";
import AlumnusBasic from "../pages/onboarding/Alumnus/AlumnusBasic";
import AlumnusProfessional from "../pages/onboarding/Alumnus/AlumnusProfessional";
import AlumnusSchool from "../pages/onboarding/Alumnus/AlumnusSchool";
import StudentBasic from "../pages/onboarding/Student/StudentBasic";
import LecturerBasic from "../pages/onboarding/lecturer/LecturerBasic";
import { rootRoute } from "./root";

// Public parent route (no auth required)
export const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: () => <Outlet />,
   notFoundComponent: () => <div>Page Not Found</div>,
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

export const alumnusBasicRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/signup/alumnusBasic",
  component: AlumnusBasic
})

export const alumnusSchoolRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/signup/alumnusSchool",
  component: AlumnusSchool
})

export const alumnusProfessionalRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/signup/alumnusProfessional",
  component: AlumnusProfessional
})

export const studentBasicRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/signup/studentBasic",
  component: StudentBasic
})

export const lecturerBasicRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/signup/lecturerBasic",
  component: LecturerBasic
})

export const forgotPasswordRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/forgot-password",
  component: ForgotPassword,
});
