import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import type React from "react";

export function DroppableContentArea(props: React.PropsWithChildren<{ className?: string }>) {
  const { setNodeRef, isOver } = useDroppable({
    id: "content-area",
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        `flex-1 transition-colors`,
        isOver && "border-2 border-dashed border-red-400 bg-red-50",
        props.className ?? "",
      )}
    >
      {props.children}
    </div>
  );
}
