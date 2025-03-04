import type React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  data?: Record<string, unknown> | undefined;
}

export function SortableItem({ id, children, data }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } =
    useSortable({
      id,
      data: {
        ...data,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`relative mb-4 cursor-grab active:cursor-grabbing ${isSorting ? "z-10" : ""}`}
    >
      {children}
    </div>
  );
}
