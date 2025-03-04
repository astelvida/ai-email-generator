import type React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableContentAreaProps {
  children: React.ReactNode;
}

export function DroppableContentArea({ children }: DroppableContentAreaProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "content-area",
  });

  return (
    <div ref={setNodeRef} className={`flex-1 transition-colors ${isOver ? "bg-purple-50" : ""}`}>
      {children}
    </div>
  );
}
