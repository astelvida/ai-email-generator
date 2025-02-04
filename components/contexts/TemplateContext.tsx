import { Template } from "@/lib/db/schema";
import { createContext, useContext } from "react";

export interface TemplateContextType {
  template: Template | null;
  setTemplate: (template: Template) => void;
}

export const defaultValue: TemplateContextType = {
  template: null,
  setTemplate: () => {},
};

export const TemplateContext = createContext<TemplateContextType | null>(null);

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return context;
};
