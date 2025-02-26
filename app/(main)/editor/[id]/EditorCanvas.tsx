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
  const { isOver, setNodeRef, over } = useDroppable({
    id: "droppable-canvas",
  });

  const { elements } = useEmailBuilder();

  return (
    <div className="flex-1 overflow-auto bg-muted/20 p-4">
      <div
        ref={setNodeRef}
        className={cn(
          "mx-auto rounded-lg bg-white p-8 shadow-sm transition-all duration-200 ease-in-out",
          view === "desktop" ? "w-full max-w-2xl" : "w-full max-w-md",
          isOver && "ring-2 ring-primary ring-offset-2",
        )}
      >
        {elements.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            Start by dragging a layout or element to the canvas
          </div>
        ) : (
          elements.map((element, index) =>
            element.type?.includes("layout") ? (
              <ColumnLayout key={element.id} layout={element} />
            ) : (
              <ElementRenderer key={element.id} element={element} />
            ),
          )
        )}
      </div>
    </div>
  );
}
