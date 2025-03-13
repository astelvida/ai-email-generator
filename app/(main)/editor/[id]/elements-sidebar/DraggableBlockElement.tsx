"use client";

import { LayoutOptionWithIcons } from "@/lib/data";
import { BlockElement } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type DraggableBlockElementProps = {
  element: Omit<BlockElement, "icon"> | Omit<LayoutOptionWithIcons, "icon">;
  elementType: string;
  disabled?: boolean;
  children: React.ReactNode;
};

export function DraggableBlockElement({ element, children, disabled }: DraggableBlockElementProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `block-${element.type}`,
    data: {
      block: element,
      type: "block",
    },
    disabled,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 999 : "auto",
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        `cursor-grab ${isDragging ? "opacity-50" : ""} ${disabled ? "cursor-not-allowed opacity-50" : ""}`,
      )}
    >
      {children}
    </div>
  );
}
