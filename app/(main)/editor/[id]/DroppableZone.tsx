import type React from "react";
import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface DroppableZoneProps {
  id: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  items: string[];
}

export function DroppableZone({ id, children, className = "", style, items }: DroppableZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const borderClass = isOver
    ? "border-purple-500 bg-purple-100"
    : "border-purple-300 bg-purple-50/50";

  // Check if there are any actual children (not just empty arrays or null values)
  const hasItems = items.length > 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative min-h-[100px] rounded-lg border-2 border-dashed ${borderClass} p-4 transition-colors ${className}`}
    >
      {hasItems ? (
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">{children}</div>
        </SortableContext>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-purple-500">
          <Plus className="h-6 w-6" />
          <p className="text-sm">Drop content blocks here</p>
        </div>
      )}
    </div>
  );
}
