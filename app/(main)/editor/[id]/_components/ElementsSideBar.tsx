"use client";

import ElementList from "@/lib/configs/ElementList";
import LayoutList from "@/lib/configs/Layout";
import { ElementLayoutCard } from "./ElementLayoutCard";
import { useDragAndDrop } from "@/providers/DragAndDropProvider";
import { ElementConfig, LayoutConfig } from "@/lib/types/config.types";

export function ElementsSidebar() {
  const { dragElementLayout, setDragElementLayout } = useDragAndDrop();

  const onDragLayoutStart = (layout: LayoutConfig) => {
    console.log("dragLayoutStart", layout);
    setDragElementLayout({
      dragLayout: {
        ...layout,
        id: Date.now().toString(),
      },
    });
  };

  const onDragElementStart = (element: ElementConfig) => {
    console.log("dragElementStart", element);
    setDragElementLayout({
      dragElement: {
        ...element,
        id: Date.now().toString(),
      },
    });
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Layouts</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {LayoutList.map((layout, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => {
                onDragLayoutStart(layout);
              }}
            >
              <ElementLayoutCard layout={layout} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Elements</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ElementList.map((element, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => {
                onDragElementStart(element);
              }}
            >
              <ElementLayoutCard layout={element} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
