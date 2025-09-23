import { useRouter } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const router = useRouter();
  const { isLoggedIn, signIn, signOut } = useAuth();

  const handleSignIn = () => {
    signIn();
    router.invalidate();
  };

  const handleSignOut = () => {
    signOut();
    router.invalidate();
  };

  return (
    <>
      <h1>Login</h1>
      {isLoggedIn ? (
        <>
          <p>You are logged in!</p>
          <button onClick={handleSignOut} className='rounded bg-red-500 text-white p-2'>Sign out</button>
        </>
      ) : (
        <button onClick={handleSignIn} className='rounded bg-blue-500 text-white p-2'>Sign in</button>
      )}
    </>
  );
}