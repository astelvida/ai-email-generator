"use client";

import { initialElements } from "@/_data/initial-data";
import { LayoutOption } from "@/lib/data";
import { BuilderElement } from "@/lib/types";
import { nanoid } from "@/lib/utils";
import type React from "react";
import { createContext, useContext, useState } from "react";

interface DesignerContextType {
  layouts: LayoutOption[];
  // setLayouts: React.Dispatch<React.SetStateAction<LayoutOption[]>>;
  addLayout: (layout: LayoutOption) => void;
  removeLayout: (layout: LayoutOption) => void;
  updateLayout: (updatedLayout: LayoutOption) => void;

  blocks: BuilderElement[];
  addBlock: (block: BuilderElement) => void;
  removeBlock: (block: BuilderElement) => void;
  updateBlock: (updatedBlock: BuilderElement) => void;
  selectedElement: BuilderElement | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<BuilderElement | null>>;
}

const DesignerContext = createContext<DesignerContextType | undefined>(undefined);

export function DesignerProvider({ children }: { children: React.ReactNode }) {
  const [elements, setElements] = useState<BuilderElement[]>(initialElements);
  const [selectedElement, setSelectedElement] = useState<BuilderElement | null>(null);

  const updateElement = (activeElement, overId) => {
    const [rowIdx, columnIdx] = overId.split("-").slice(-2);

    const rowIndex = Number(rowIdx);
    const columnIndex = Number(columnIdx);

    setElements((prev) => [
      ...prev.slice(0, rowIndex),
      {
        ...prev[rowIndex],
        children: prev[rowIndex].children?.map((child, index) =>
          index === columnIndex ? { ...child, ...activeElement } : child,
        ),
      },
      ...prev.slice(rowIndex + 1),
    ]);
  };

  const addElement = (element: BuilderElement) => {
    const { type, label, ...data } = element;
    const newElement = {
      id: nanoid(),
      type,
      label,
    };

    if (type?.includes("layout")) {
      const columns = type.split("-").map(Number)[1];

      Object.assign(newElement, {
        layout: true,
        columns,
        children: Array.from({ length: columns }, (_, index) => ({
          id: `${newElement.id}-${elements.length}-${index}`,
        })),
      });
    } else {
      Object.assign(newElement, data);
    }

    setElements((prev) => [...prev, newElement]);
  };

  const removeElement = (element: BuilderElement) => {
    setElements((prev) => prev.filter((el) => el.id !== element.id));
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}

export function useDesignerProvider() {
  const context = useContext(DesignerContext);
  if (context === undefined) {
    throw new Error("useEmailBuilder must be used within a  ");
  }
  return context;
}

// import { Dispatch, ReactNode, SetStateAction } from "react";
// import { FormElementInstance } from "../FormElements";

// type DesignerContextType = {
//   elements: FormElementInstance[];
//   setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
//   addElement: (index: number, element: FormElementInstance) => void;
//   removeElement: (id: string) => void;

//   selectedElement: FormElementInstance | null;
//   setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;

//   updateElement: (id: string, element: FormElementInstance) => void;
// };
