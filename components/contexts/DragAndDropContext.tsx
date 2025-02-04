"use client";
import { createContext, useContext, useState } from "react";

export interface DragAndDropContextType {
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

export const defaultValue: DragAndDropContextType = {
  isDragging: false,
  setIsDragging: () => {},
};

export const DragAndDropContext = createContext<DragAndDropContextType | null>(
  null
);

type DragAndDropProviderProps = {
  children: React.ReactNode;
};

export const DragAndDropProvider = ({ children }: DragAndDropProviderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <DragAndDropContext.Provider value={{ isDragging, setIsDragging }}>
      {children}
    </DragAndDropContext.Provider>
  );
};

export const useDragAndDrop = () => {
  const context = useContext(DragAndDropContext);
  if (!context) {
    throw new Error("useDragAndDrop must be used within a DragAndDropProvider");
  }
  return context;
};
