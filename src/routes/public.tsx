import {  Outlet, createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import Landing from "@/pages/landing";
import Login from "@/pages/onboarding/Login";
import SignUp from "@/pages/onboarding/SignUp";
import ForgotPassword from "@/pages/onboarding/ForgotPassword";
import AlumnusBasic from "@/pages/onboarding/Alumnus/pages/01-AlumnusBasic";
import AlumnusProfessional from "@/pages/onboarding/Alumnus/pages/03-AlumnusProfessional";
import AlumnusSchool from "@/pages/onboarding/Alumnus/pages/02-AlumnusSchool";
import StudentBasic from "@/pages/onboarding/Student/pages/01-StudentBasic";

import SignUpSuccess from '@/pages/onboarding/SignUpSuccess'
import StudentSchool from "@/pages/onboarding/Student/pages/02-StudentSchool";
import StudentProfessional from "@/pages/onboarding/Student/pages/03-StudentProfessional";
import CheckEmail from "@/pages/onboarding/CheckEmail";
import ResetPassword from "@/pages/onboarding/ResetPassword";
import ResetSuccess from "@/pages/onboarding/ResetSuccess";
import SignUpOTP from "@/pages/onboarding/SignUpOTP";

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


// Sign Up Section
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
  component: () => <div>Lecturer Basic</div>
})

export const signupOTPRoute  = createRoute({
  getParentRoute: () => publicRoute,
  path: "/signup/otp",
  component: SignUpOTP
})

export const signupSuccessRoute  = createRoute({
  getParentRoute: () => publicRoute,
  path: "/signup/success",
  component: SignUpSuccess
})

// Forgot Password Section
export const forgotPasswordRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/forgot-password",
  component: ForgotPassword,
});

export const checkEmailRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/check-email",
  component: CheckEmail,
});

export const resetPasswordRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/reset-password",
  component: ResetPassword,
});

export const resetSuccessRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/reset-success",
  component: ResetSuccess,
});

