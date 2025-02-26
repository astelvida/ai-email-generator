"use client";

import { useEmailBuilder } from "@/providers/email-builder-context";
import { closestCenter, closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { Settings } from "./Settings";
import { EditorCanvas } from "./EditorCanvas";
import { ElementsSidebar } from "./ElementsSidebar";
import { SortableContext } from "@dnd-kit/sortable";

export function EmailBuilder() {
  const { addElement, updateElement, elements } = useEmailBuilder();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    // console.log(event);

    console.log("over,id=", over?.id);
    console.log("active", active);
    console.log("over", over);

    if (over && over.id === "droppable-canvas") {
      addElement(active.data.current);
    }

    if (over && over.id !== "droppable-canvas") {
      updateElement(active.data.current, over.id);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* <SortableContext items={elements.map((element) => element.id)}> */}
      <div className="flex flex-1 overflow-hidden">
        <ElementsSidebar />
        <EditorCanvas />
        <Settings />
      </div>
      {/* </SortableContext> */}
    </DndContext>
  );
}
