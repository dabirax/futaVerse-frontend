// src/store/useSignupStore.ts
import { create } from "zustand";
import {  createJSONStorage, persist, } from "zustand/middleware";

type SignupState = {
  email: string | null;
  setEmail: (email: string) => void;
  userType: "student" | "alumnus" | "lecturer" | null;
  setUserType: (type: SignupState["userType"]) => void;
};

export const useSignupOTPStore = create<SignupState>()(
  persist(
    (set) => ({
      email: null,
      setEmail: (email) => set({ email }),
      userType: null,
      setUserType: (type) => set({ userType: type }),
    }),
    {
      name: "signup-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
