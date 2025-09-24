import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { AuthContextType } from "../hooks/auth-context";

// Root route with context
export const rootRoute = createRootRouteWithContext<{ auth: AuthContextType }>()({
  component: () => <Outlet />,
});
