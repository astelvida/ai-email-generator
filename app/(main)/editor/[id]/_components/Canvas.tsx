"use client";

import { Template } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LayoutGrid } from "./LayoutGrid";
import { useToggleView, View } from "@/components/contexts/ToggleViewContext";

interface CanvasProps {
  template: Template;
}

export function Canvas({ template }: CanvasProps) {
  const { view } = useToggleView();
  const [activeLayout, setActiveLayout] = useState<string | null>(null);
  const [elements, setElements] = useState<Record<string, any>>({});

  const handleDrop = (e: React.DragEvent, cellId: string) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData("element");

    setElements((prev) => ({
      ...prev,
      [cellId]: { type: elementType, content: "" },
    }));
  };

  return (
    <div className="h-full flex  justify-center">
      <div
        className={cn(
          "border-2 border-dashed border-gray-300 rounded-lg text-gray-500 w-full",
          // TODO: replace with getLayoutClass
          view === "mobile"
            ? "max-w-[375px] h-[667px]"
            : view === "tablet"
            ? "max-w-[768px]"
            : ""
        )}
      >
        <div className="p-4 w-full h-full overflow-auto">
          {activeLayout ? (
            <LayoutGrid
              layout={activeLayout}
              onDrop={handleDrop}
              elements={elements}
            />
          ) : (
            <div
              className="h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const layoutType = e.dataTransfer.getData("layout");
                setActiveLayout(layoutType);
              }}
            >
              Drag a layout here to start
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
