"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";

// Define the shape of your context state
type SelectedElementContextType = {
  selectedElement: HTMLElement | null;
  setSelectedElement: Dispatch<SetStateAction<HTMLElement | null>>;
};

// Create the context with an undefined default value
const SelectedElementContext = createContext<SelectedElementContextType | undefined>(undefined);

// Create a provider component
export const SelectedElementProvider = ({ children }: { children: ReactNode }) => {
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    console.log("selectedElement", selectedElement);
  }, [selectedElement]);

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
