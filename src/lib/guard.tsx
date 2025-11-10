// utils/guards.ts
import { redirect } from "@tanstack/react-router";

// Simple auth check
export const requireAuth = ({ context }: { context: any }) => {
  if (!context.auth?.isLoggedIn) {
    throw redirect({ to: "/login" });
  }
};

// Role-based check
export const requireRole = (allowedRoles: Array<string>) => {
  return ({ context }: { context: any }) => {
    requireAuth({ context }); // first check if logged in
    if (!allowedRoles.includes(context.auth.role)) {
      throw redirect({ to: "/unauthorized" });
    }
  };
};
