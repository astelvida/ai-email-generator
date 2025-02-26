import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable({
  id,
  data,
  children,
  style = {},
}: {
  id: string;
  data?: any;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: data,
  });

  const droppableStyle = {
    color: isOver ? "blue" : undefined,
  };

  return (
    <div ref={setNodeRef} style={{ ...style, ...droppableStyle }}>
      {children}
    </div>
  );
}
