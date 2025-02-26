import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type View = "mobile" | "desktop";

interface ViewStore {
  view: View;
  setView: (view: View) => void;
}

export const useViewStore = create<ViewStore>()(
  persist(
    devtools((set) => ({
      view: "desktop",
      setView: (view: View) => set(() => ({ view })),
    })),
    {
      name: "view-store",
    },
  ),
);
