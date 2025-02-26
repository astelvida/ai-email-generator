"use client";

import { useEmailBuilder } from "@/providers/email-builder-context";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { Settings } from "./Settings";
import { EditorCanvas } from "./EditorCanvas";
import { ElementsSidebar } from "./ElementsSidebar";
import { TopBar } from "./TopBar";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";

export function EmailBuilder() {
  const { addElement, updateElement } = useEmailBuilder();

  function handleDragEnd(event: DragEndEvent) {
    // console.log(event);

    if (event.over && event.over.id === "droppable-canvas") {
      addElement(event.active.data.current);
    } else if (event.over && event.over.id !== "droppable-canvas") {
      console.log("somewehere else  ", event.over.id);
      updateElement(event.active.data.current, event.over.id);

      console.log(event);
      // updateElement(event.active.data.current);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      {/* <SortableContext items={elements.map((element) => element.id)}> */}
      <div className="h-screen bg-background">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <ElementsSidebar />
          <EditorCanvas />
          <Settings />
        </div>
      </div>
      {/* </SortableContext> */}
    </DndContext>
  );
}
