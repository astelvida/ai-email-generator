"use client";
import * as React from "react";
import { useState } from "react";
// import "react-app-polyfill/ie11";

import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

let c = 0;

const Playground = () => {
  const containers = ["A", "B", "C"];
  const [items, setItems] = useState<UniqueIdentifier[]>([]);
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const DefaultDraggable = (text = "Drag ME") => (
    <Draggable className="bg-blue-500 p-2">{text}</Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* <DefaultDraggable /> */}
      {/* {parent === null ? DefaultDraggable() : null} */}
      {DefaultDraggable()}
      <div className="flex flex-col gap-4 p-4">
        {containers.map((container) => (
          <Droppable key={container} id={container}>
            {/* {parent === container ? DefaultDraggable() : "Drop here"} */}

            {items.length > 0 ? (
              <div className={cn("flex gap-2", parent === container ? "flex-col" : "flex-row")}>
                {items
                  .filter((item) => item.parentId === container)
                  .map((item) => (
                    <Draggable key={item.id} id={item.id} className="bg-pink-200 p-1">
                      {item.parentId}+{item.id}
                    </Draggable>
                  ))}
              </div>
            ) : (
              <div className="bg-blue-500 p-2">Drop here</div>
            )}
          </Droppable>
        ))}
      </div>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    setParent(over ? over.id : null);

    console.log(active.id, over?.id);

    if (over && active.id !== over.id && active.id === "draggable-item") {
      c++;
      console.log(c);
      setItems((prev) => [...prev, { id: c.toString(), parentId: over.id }]);
    }

    if (over && active.id !== over.id) {
      // c++
      setItems((prev) =>
        prev.map((item) => (item.id === active.id ? { ...item, parentId: over.id } : item)),
      );
    }
  }
};

function Draggable(props: { id: string; children: React.ReactNode; className: string }) {
  const { attributes, isDragging, transform, setNodeRef, listeners } = useDraggable({
    id: props.id || "draggable-item",
  });

  return (
    <button
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        boxShadow: isDragging
          ? "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
          : undefined,
      }}
      className={props.className}
      {...attributes}
      {...listeners}
    >
      {props.children}
    </button>
  );
}

interface DroppableProps {
  children: React.ReactNode;
  id: string;
}

function Droppable({ id, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 150,
        border: "1px solid",
        margin: 20,
        borderColor: isOver ? "#4c9ffe" : "#EEE",
      }}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
}

export default Playground;
