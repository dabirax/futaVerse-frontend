import React, { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import type { AuthContextType } from "./auth-context";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  const signIn = useCallback(() => {
    localStorage.setItem("isAuthenticated", "true");
    setIsLoggedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("isAuthenticated");
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(localStorage.getItem("isAuthenticated") === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value: AuthContextType = {
    isLoggedIn,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
