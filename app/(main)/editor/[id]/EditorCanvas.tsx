"use client";

import { useEffect, useRef, useState } from "react";
import { ColumnLayout } from "./ColumnLayout";
import { useViewStore } from "@/stores/view";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useEmailBuilder } from "@/providers/email-builder-context";
import { Droppable } from "@/components/Droppable";
import { BuilderElement } from "@/lib/types";
import { ElementRenderer } from "./ElementRenderer";

export function EditorCanvas() {
  const { view } = useViewStore();
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable-canvas",
  });

  const { elements } = useEmailBuilder();

  useEffect(() => {
    console.log(elements);
  }, []);

  return (
    <div ref={setNodeRef} className="m-10 flex-1 overflow-auto bg-muted/20">
      <div
        className={cn(
          "m-10 mx-auto border-2 border-dashed border-purple-200 shadow-sm transition-all duration-200 ease-in-out",
          view === "desktop" ? "max-w-2xl" : "max-w-md",
          isOver && "ring-3 bg-purple-50 ring-teal-500 ring-offset-2",
        )}
      >
        {elements.length === 0 && (
          <div className="flex h-[300px] items-center justify-center bg-white text-muted-foreground">
            Drag something to get started
          </div>
        )}
        {elements.map((element, index) =>
          element.type?.includes("layout") ? (
            <ColumnLayout key={element.id} layout={element} />
          ) : (
            <ElementRenderer key={element.id} element={element} />
          ),
        )}
      </div>
    </div>
  );
}
