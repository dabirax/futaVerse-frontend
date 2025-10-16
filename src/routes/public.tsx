import {  Outlet, createRoute } from "@tanstack/react-router";
import Landing from "../pages/landing";
import Login from "../pages/onboarding/Login";
import SignUp from "../pages/onboarding/SignUp";
import ForgotPassword from "../pages/onboarding/ForgotPassword";
import AlumnusBasic from "../pages/onboarding/Alumnus/pages/AlumnusBasic";
import AlumnusProfessional from "../pages/onboarding/Alumnus/pages/AlumnusProfessional";
import AlumnusSchool from "../pages/onboarding/Alumnus/pages/AlumnusSchool";
import StudentBasic from "../pages/onboarding/Student/pages/StudentBasic";
import LecturerBasic from "../pages/onboarding/lecturer/LecturerBasic";
import Success from '../pages/onboarding/Success'
import { rootRoute } from "./__root";
import StudentSchool from "@/pages/onboarding/Student/pages/StudentSchool";
import StudentProfessional from "@/pages/onboarding/Student/pages/StudentProfessional";

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
export const studentSchoolRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/signup/studentSchool",
  component: StudentSchool
})

export const studentProfessionalRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/signup/studentProfessional",
  component: StudentProfessional
})


export const lecturerBasicRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/signup/lecturerBasic",
  component: LecturerBasic
})

export const successRoute  = createRoute({
  getParentRoute: () => publicRoute,
  path: "/signup/success",
  component: Success
})

export const forgotPasswordRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/forgot-password",
  component: ForgotPassword,
});
