import {create} from "zustand";
import {createJSONStorage, persist } from 'zustand/middleware'
import type { AlumnusFormData } from "../lib/alumnusSchema"

type AlumnusState = Partial<AlumnusFormData> & {
    setData: (data: Partial<AlumnusFormData>) => void;
}

export const useAlumnusStoreData = create<AlumnusState>()(
    persist(
        (set) => ({
            setData: (data) => set(data),
            
        }),
        {
            name: "almnus-onboarding-storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
)

export const useHasHydrated = () => {
  const hasHydrated = useAlumnusStoreData.persist.hasHydrated()
  return hasHydrated
}