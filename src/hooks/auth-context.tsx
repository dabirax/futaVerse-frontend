import { createContext } from 'react';

export type AuthContextType = {
  isLoggedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
