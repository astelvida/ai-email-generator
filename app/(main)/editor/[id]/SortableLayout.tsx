import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type React from "react";

interface SortableLayoutProps {
  id: string;
  children: React.ReactNode;
  data: Record<string, unknown>;
  className?: string;
  onClick?: () => void;
}

export function SortableLayout({ id, data, className, children, onClick }: SortableLayoutProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } =
    useSortable({
      id,
      data: {
        layout: data,
        type: "layout",
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
      className={cn(
        `relative mb-2 cursor-grab active:cursor-grabbing ${isSorting ? "z-10" : ""}`,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
