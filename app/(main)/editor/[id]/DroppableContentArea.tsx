import type React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableContentAreaProps {
  children: React.ReactNode;
  className?: string;
}

export function DroppableContentArea({ children, className }: DroppableContentAreaProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "content-area",
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 transition-colors ${isOver ? "bg-purple-300" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
