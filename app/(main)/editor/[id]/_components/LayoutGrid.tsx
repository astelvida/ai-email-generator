"use client";

import { cn } from "@/lib/utils";
import { ElementRenderer } from "./ElementRenderer";

interface LayoutGridProps {
  layout: string;
  onDrop: (e: React.DragEvent, cellId: string) => void;
  elements: Record<string, any>;
}

export function LayoutGrid({ layout, onDrop, elements }: LayoutGridProps) {
  const getGridConfig = (layout: string) => {
    switch (layout) {
      case "1-column":
        return "grid-cols-1";
      case "2-column":
        return "grid-cols-2";
      case "3-column":
        return "grid-cols-3";
      case "4-column":
        return "grid-cols-4";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <div className={cn("grid gap-4", getGridConfig(layout))}>
      {Array.from({ length: parseInt(layout[0]) }).map((_, index) => (
        <div
          key={index}
          className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, `cell-${index}`)}
        >
          {elements[`cell-${index}`] ? (
            <ElementRenderer element={elements[`cell-${index}`]} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Drag elements here
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
