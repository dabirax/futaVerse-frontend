import {  createRootRouteWithContext, createRoute, redirect } from "@tanstack/react-router";
import { Root } from "../components/root";
import { Landing } from "../pages/landing";
import { Dashboard } from "../pages/user/Dashboard";
import Login from "../pages/onboarding/Login";
import type { AuthContextType } from '../hooks/auth-context';
// import { useAuth } from '../hooks/useAuth';



//   const { isLoggedIn } = useAuth();

const rootRoute = createRootRouteWithContext<{ auth: AuthContextType }>()({
  component: () => <Root />,
});

const landingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Landing,
});
  
const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    beforeLoad: ({ context }) => {
        if(!context.auth.isLoggedIn) {
            throw redirect({ to: '/login' });
        }
    },
    path: "/dashboard",
    component: Dashboard,
}); 


const LoginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: Login,
});

export const routeTree = rootRoute.addChildren([landingRoute, dashboardRoute, LoginRoute]);