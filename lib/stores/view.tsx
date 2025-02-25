import { create } from "zustand";

type View = "mobile" | "desktop";

type ViewStore = {
  view: View;
  setView: (view: View) => void;
};

export const useViewStore = create<ViewStore>((set) => ({
  view: "desktop",
  setView: (view: View) => set(() => ({ view })),
}));
