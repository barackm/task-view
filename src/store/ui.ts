import { create } from "zustand";

type UiState = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
