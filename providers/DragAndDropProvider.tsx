"use client";

import { ElementConfig, LayoutConfig } from "@/lib/types/config.types";
import { createContext, useContext, useState } from "react";

export type DragElementLayout = {
  dragLayout?: LayoutConfig;
  dragElement?: ElementConfig;
};

export interface DragAndDropContextType {
  dragElementLayout: DragElementLayout | null;
  setDragElementLayout: (dragElementLayout: DragElementLayout) => void;
}

export const DragAndDropContext = createContext<DragAndDropContextType | null>(null);

export const DragAndDropProvider = ({ children }: { children: React.ReactNode }) => {
  const [dragElementLayout, setDragElementLayout] = useState<DragElementLayout | null>(null);

  return (
    <DragAndDropContext.Provider value={{ dragElementLayout, setDragElementLayout }}>
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
