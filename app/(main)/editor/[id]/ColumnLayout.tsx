"use client";

import { BuilderElement } from "@/lib/types";

import { LayoutConfig } from "@/lib/types";
import { getElementComponent } from "./ElementRenderer";
import { useDroppable } from "@dnd-kit/core";

export const DroppableColumn = ({ colItem }: { colItem: BuilderElement }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: colItem.id,
  });

  const droppableStyle = {
    backgroundColor: isOver ? "lightblue" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={droppableStyle}
      className="flex h-[100px] items-center justify-center border-2 border-dashed border-sky-300/50 bg-sky-200 text-center text-xs"
    >
      {getElementComponent(colItem) || colItem.id + "\nDrag something "}
    </div>
  );
};

interface DroppableColumnLayoutProps {
  layout: LayoutConfig;
  index: number;
}

export function DroppableColumnLayout({ layout, index: rowIndex }: DroppableColumnLayoutProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${layout.columns}, 1fr)` }}>
      {layout.children.map((colItem, index) => (
        <DroppableColumn key={colItem.id} colItem={{ ...colItem, index }} />
      ))}
    </div>
  );
}
