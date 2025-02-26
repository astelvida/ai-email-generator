"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import type { BuilderElement } from "@/lib/types";

type BuilderElement = {
  id: string;
  type?: string;
  label?: string;
  text?: string;
  style?: React.CSSProperties;
  src?: string;
  alt?: string;
  children?: BuilderElement[];
  columns?: number;
};

const initialElements: BuilderElement[] = [
  {
    id: "1334",
    type: "layout",
    label: "2 Column",
    columns: 2,
    children: [
      {
        id: "1334-0-0",
        type: "image",
        label: "Image",
        src: "https://via.placeholder.com/150",
        alt: "Image",
        style: {
          width: "100%",
          height: "100%",
        },
      },
      {
        id: "1334-0-1",
      },
    ],
  },
  {
    id: "1335",
    type: "text",
    label: "Text",
    text: "Hello, world!",
  },
  {
    id: "1336",
    type: "layout",
    label: "3 Column",
    columns: 3,
    children: [
      {
        id: "1336-2-0",
        type: "button",
        label: "Button",
        text: "1st Column, 1st Row!",
        style: {
          fontWeight: "bold",
          color: "#FAFAFA",
          textAlign: "center",
          backgroundColor: "#AA5AFA",
          borderRadius: "10px",
          padding: "10px",
        },
      },
      {
        id: "1336-2-1",
        type: "text",
        label: "Text",
        text: "2nd Column, 3rd Row!",
        style: {
          fontWeight: "bold",
          color: "#000",
          textAlign: "center",
        },
      },
      { id: "1336-2-2" },
    ],
  },
];

interface EmailBuilderContextType {
  elements: BuilderElement[];
  setElements: React.Dispatch<React.SetStateAction<BuilderElement[]>>;
  addElement: (element: BuilderElement) => void;
  removeElement: (element: BuilderElement) => void;
  selectedElement: BuilderElement | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<BuilderElement | null>>;
  updateElement: (updatedElement: BuilderElement) => void;
}

const EmailBuilderContext = createContext<EmailBuilderContextType | undefined>(undefined);

export function EmailBuilderProvider({ children }: { children: React.ReactNode }) {
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
      id: uuidv4(),
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
    <EmailBuilderContext.Provider
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
    </EmailBuilderContext.Provider>
  );
}

export function useEmailBuilder() {
  const context = useContext(EmailBuilderContext);
  if (context === undefined) {
    throw new Error("useEmailBuilder must be used within a EmailBuilderProvider");
  }
  return context;
}

const items = {
  A: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
  B: ["B1", "B2"],
  C: ["C1", "C2", "C3"],
  D: ["D1", "D2", "D3", "D4", "D5"],
};
