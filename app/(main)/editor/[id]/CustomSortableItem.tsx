import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type React from "react";

interface CustomSortableItemProps {
  id: string;
  children: React.ReactNode;
  data?: Record<string, unknown> | undefined;
  className?: string;
}

export type CustomSortableItemType = "layout" | "column" | "block";

export function CustomSortableItem({ id, data, children, className }: CustomSortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } =
    useSortable({
      id,
      data: {
        ...data,
        elementType: data?.elementType,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
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
      className={cn(
        `relative cursor-grab hover:bg-purple-200 active:cursor-grabbing ${isSorting ? "z-10" : ""}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
