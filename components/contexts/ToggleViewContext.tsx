"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type View = "mobile" | "tablet" | "desktop";

export type ToggleViewContextType = {
  view: View;
  setView: (view: View) => void;
};

export const defaultValue: ToggleViewContextType = {
  view: "desktop",
  setView: () => {},
};

export const ToggleViewContext =
  createContext<ToggleViewContextType>(defaultValue);

type ToggleViewProviderProps = {
  children: React.ReactNode;
  initialValue?: View;
};

export const ToggleViewProvider = ({
  children,
  initialValue,
}: ToggleViewProviderProps) => {
  const [view, setView] = useState<View>(initialValue || "desktop");

  useEffect(() => {
    setView(view);
  }, [view]);

  return (
    <ToggleViewContext.Provider value={{ view, setView }}>
      {children}
    </ToggleViewContext.Provider>
  );
};

export const useToggleView = () => {
  const context = useContext(ToggleViewContext);
  if (!context) {
    throw new Error("useToggleView must be used within a ToggleViewProvider");
  }
  return context;
};

export const getLayoutClass = (view: View) => {
  switch (view) {
    case "mobile":
      return "w-full sm:w-[375px] h-[667px]";
    case "tablet":
      return "w-full sm:w-[768px] h-[1024px]";
    case "desktop":
      return "w-full";
    default:
      return "w-full";
  }
};
