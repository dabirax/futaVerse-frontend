// utils/guards.ts
import { redirect } from "@tanstack/react-router";

// Read directly from sessionStorage so the guard works even before React re-renders
export const requireAuth = () => {
  const token = sessionStorage.getItem("access_token");
  if (!token) throw redirect({ to: "/login" });
};

export const requireRole = (allowedRoles: Array<string>) => {
  return () => {
    requireAuth();
    const role = sessionStorage.getItem("role");
    if (!role || !allowedRoles.includes(role)) {
      throw redirect({ to: "/unauthorized" });
    }
  };
};
