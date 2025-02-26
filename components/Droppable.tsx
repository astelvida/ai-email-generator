import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: { id: string; data?: any; children?: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const droppableStyle = {
    color: isOver ? "blue" : undefined,
  };

  return (
    <div ref={setNodeRef} style={droppableStyle}>
      {props.children}
    </div>
  );
}
