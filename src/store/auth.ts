import { create } from "zustand";

type AuthState = {
  currentUser: any;
  setCurrentUser: (user: any) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
