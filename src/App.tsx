
import {RouterProvider, createRouter } from '@tanstack/react-router';
// import { routeTree } from './routeTree.gen';
import { routeTree } from './routes/route';
import { AuthProvider } from './hooks/auth-provider';
import { useAuth } from './hooks/useAuth';

//  Component that builds router with live auth state
function RouterWithAuth() {
  const auth = useAuth();

  const router = createRouter({
    routeTree,
    context: { auth }, // Provide auth state to all routes
  });

  return <RouterProvider router={router} />;
}

// Wrap everything in AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <RouterWithAuth />
    </AuthProvider>
  );
}
