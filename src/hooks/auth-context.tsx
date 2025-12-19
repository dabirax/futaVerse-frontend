// src/hooks/AuthContext.tsx
import { createContext, useContext,useEffect, useState } from "react";
import type { ReactNode } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  role: string | null;
  token: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load token from sessionStorage on mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem("access_token");
    const storedRole = sessionStorage.getItem("role");
    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (newToken: string, newRole: string) => {
    sessionStorage.setItem("access_token", newToken);
    sessionStorage.setItem("role", newRole);
    setToken(newToken);
    setRole(newRole);
    setIsLoggedIn(true);
    if (newRole === "student") {
      window.location.href = "/student/dashboard";
    } else if (newRole === "alumnus") {
      window.location.href = "/alumnus/dashboard";
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setToken(null);
    setRole(null);
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
