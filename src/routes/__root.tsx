import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { AuthContextType } from "../hooks/auth-context";

// Root route with context
export const rootRoute = createRootRouteWithContext<{ auth: AuthContextType }>()({
  component: () => <Outlet />,
    notFoundComponent: () => (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">404 Not Found</h1>
      <p className="text-gray-500 mt-2">This page wandered off.</p>
    </div>
  ),

});
