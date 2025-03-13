import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type React from "react";

interface SortableBlockProps {
  id: string;
  children: React.ReactNode;
  data: Record<string, unknown>;
  className?: string;
  onClick?: () => void;
}

export function SortableBlock({ id, children, data, className, onClick }: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } =
    useSortable({
      id,
      data: {
        type: "block",
        block: data,
        blockType: data?.type,
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
      onClick={onClick}
      {...attributes}
      {...listeners}
      style={style}
      className={cn(
        `relative cursor-grab active:cursor-grabbing ${isSorting ? "z-10" : ""}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
