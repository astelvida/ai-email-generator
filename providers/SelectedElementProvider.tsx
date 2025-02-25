"use client";
import { LayoutConfig } from "@/lib/types/config.types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { useEmailTemplate } from "./EmailTemplateProvider";

interface SelectedElement {
  layout: LayoutConfig;
  index: number;
}
// Define the shape of your context state
type SelectedElementContextType = {
  selectedElement: SelectedElement | null;
  setSelectedElement: Dispatch<SetStateAction<SelectedElement | null>>;
};

// Create the context with an undefined default value
const SelectedElementContext = createContext<SelectedElementContextType | undefined>(undefined);

// Create a provider component
export const SelectedElementProvider = ({ children }: { children: ReactNode }) => {
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);

  useEffect(() => {
    // console.log("selectedElement", selectedElement);
    // localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
  }, [selectedElement, emailTemplate]);

  return (
    <SelectedElementContext.Provider value={{ selectedElement, setSelectedElement }}>
      {children}
    </SelectedElementContext.Provider>
  );
};

// Custom hook for easy context access
export const useSelectedElement = () => {
  const context = useContext(SelectedElementContext);
  if (context === undefined) {
    throw new Error("useSelectedElement must be used within a SelectedElementProvider");
  }
  return context;
};
