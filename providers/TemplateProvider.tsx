"use client";

import { createContext, useContext, useState } from "react";
import { Template } from "@/lib/db/schema";

export interface TemplateContextType {
  template: Template[];
  setTemplate: (termplate: Template[]) => void;
}

export const TemplateContext = createContext<TemplateContextType>(null);

export const TemplateProvider = ({ children }: { children: React.ReactNode }) => {
  const [template, setTemplate] = useState<Template[]>([]);

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
