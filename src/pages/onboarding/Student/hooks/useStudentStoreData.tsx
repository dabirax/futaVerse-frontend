import {create} from "zustand";
import {createJSONStorage, persist } from 'zustand/middleware'
import type { StudentFormData } from "../lib/studentSchema"

type StudentState = Partial<StudentFormData> & {
    setData: (data: Partial<StudentFormData>) => void;
}

export const useStudentStoreData = create<StudentState>()(
    persist(
        (set) => ({
            setData: (data) => set(data),
            
        }),
        {
            name: "student-onboarding-storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
)

export const useHasHydrated = () => {
  const hasHydrated = useStudentStoreData.persist.hasHydrated()
  return hasHydrated
}