"use client";

import { Template } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LayoutGrid } from "./LayoutGrid";
import { useToggleViewContext } from "@/app/use-toogle-view";

interface CanvasProps {
  template: Template;
}

export function Canvas({ template }: CanvasProps) {
  const { view } = useToggleViewContext();
  const isMobile = view === "mobile";

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
    <div className="h-full flex items-center justify-center">
      <div
        className={cn(
          "bg-white rounded-lg shadow-lg transition-all duration-200",
          isMobile ? "w-[375px] h-[667px]" : "w-[768px] h-[1024px]"
        )}
      >
        <div className="p-4">
          {activeLayout ? (
            <LayoutGrid layout={activeLayout} onDrop={handleDrop} elements={elements} />
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
