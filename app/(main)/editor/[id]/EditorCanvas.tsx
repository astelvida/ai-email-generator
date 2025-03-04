"use client";

import { DroppableColumnLayout, DroppableColumn } from "./ColumnLayout";
import { useViewStore } from "@/stores/view";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { useEmailBuilder } from "@/providers/email-builder-context";

export function EditorCanvas() {
  const { view } = useViewStore();
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable-canvas",
  });

  const { elements } = useEmailBuilder();

  return (
    <div ref={setNodeRef} className="m-10 flex-1 overflow-auto bg-muted/20">
      <div
        className={cn(
          "m-10 mx-auto border-2 border-dashed border-purple-200 shadow-sm transition-all duration-200 ease-in-out",
          view === "desktop" ? "max-w-2xl" : "max-w-md",
          isOver && "ring-3 bg-purple-50 ring-teal-500 ring-offset-2",
        )}
      >
        {/* {elements.length === 0 && (
          <div className="flex h-[300px] items-center justify-center bg-white text-muted-foreground">
            Drag something to get started
          </div>
        )}
        {elements.map((element, index) =>
          element.type?.includes("layout") ? (
            <DroppableColumnLayout key={element.id} layout={element} />
          ) : (
            <DroppableColumn key={element.id} colItem={element} />
          ),
        )} */}
      </div>
    </div>
  );
}
