"use client";

import { ElementWithId, LayoutWithId } from "@/lib/types/config.types";
import { useDragAndDrop } from "@/providers/DragAndDropProvider";
import { useTemplate } from "@/providers/TemplateProvider";
import { useState } from "react";

export function ColumnLayout({ layout }: { layout: LayoutWithId }) {
  const [dragOver, setDragOver] = useState<{
    index: number;
    columnId: string;
  } | null>(null);
  const { template, setTemplate } = useTemplate();
  const { dragElementLayout } = useDragAndDrop();

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOver({
      index,
      columnId: layout.id,
    });
  };

  const handleDrop = () => {
    const index = dragOver.index;
    setTemplate((prevItem) =>
      prevItem?.map((col) =>
        col.id === layout?.id ? { ...col, [index]: dragElementLayout?.dragElement } : col,
      ),
    );
    console.log(template);
    setDragOver(null);
  };

  const getElementComponent = (element: ElementWithId) => {
    return element?.type;
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout.numOfCol}, 1fr)`,
          gap: "0px",
        }}
      >
        {Array.from({ length: layout.numOfCol }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-center border border-dashed border-gray-300 bg-gray-200 p-2 ${
              dragOver?.index === index && dragOver?.columnId === layout.id ? "bg-red-200" : ""
            }`}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop()}
          >
            {getElementComponent(layout?.[index]) || "Drag an element here"}
          </div>
        ))}
      </div>
    </div>
  );
}
