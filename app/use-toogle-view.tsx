"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useCallback, createContext, useContext, useState } from "react";

type View = "mobile" | "desktop";

export const ToggleViewContext = createContext<{
  view: View;
  toggleView: () => void;
}>({
  view: "desktop",
  toggleView: () => {},
});

export const useToggleView = (initialView: View) => {
  const [view, setView] = useState<View>(initialView);

  const toggleView = useCallback(() => {
    setView((prev) => (prev === "mobile" ? "desktop" : "mobile"));
  }, []);

  const isMobile = view === "mobile";

  return { view, toggleView, isMobile };
};

export const ToggleViewProvider = ({ children }: { children: React.ReactNode }) => {
  const { view: _view, toggleView } = useToggleView("desktop");
  const isMobileSize = useIsMobile();

  const view = _view === "mobile" || isMobileSize ? "mobile" : "desktop";

  console.log("_view", _view, "isMobileSize", isMobileSize, "view", view);

  return (
    <ToggleViewContext.Provider value={{ view, toggleView }}>{children}</ToggleViewContext.Provider>
  );
};

export const useToggleViewContext = () => {
  const context = useContext(ToggleViewContext);
  if (!context) {
    throw new Error("useToggleViewContext must be used within a ToggleViewProvider");
  }
  return context;
};
