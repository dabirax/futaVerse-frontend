
import {RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routes/route';
import { AuthProvider, useAuth } from './hooks/auth-context';

export default function App() {
  return (
    <AuthProvider>
        <RouterWithAuth />
      </AuthProvider>
  );
}

//  Component that builds router with live auth state
function RouterWithAuth() {
  const auth = useAuth();

  const router = createRouter({
    routeTree,
    context: { auth }, // Provide auth state to all routes
  });

  return <RouterProvider router={router} />;
}

