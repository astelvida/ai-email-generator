"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ElementConfig, LayoutConfig } from "@/lib/types/config.types";

export interface TemplateContextType {
  template: (LayoutConfig | ElementConfig)[];
  setTemplate: (template: (LayoutConfig | ElementConfig)[]) => void;
}

export const TemplateContext = createContext<TemplateContextType>({
  template: [],
  setTemplate: () => {},
});

export const TemplateProvider = ({ children }: { children: React.ReactNode }) => {
  const [template, setTemplate] = useState<(LayoutConfig | ElementConfig)[]>([]);

  // useEffect(() => {
  //   const template = localStorage.getItem("template");
  //   if (template) {
  //     setTemplate(JSON.parse(template));
  //   }
  // }, [template]);

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return context;
};
