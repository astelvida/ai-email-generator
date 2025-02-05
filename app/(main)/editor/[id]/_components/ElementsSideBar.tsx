"use client";

import ElementList from "@/lib/configs/ElementList";
import Layout from "@/lib/configs/Layout";
import { ElementLayoutCard } from "./ElementLayoutCard";
import { useDragAndDrop } from "@/providers/DragAndDropProvider";

export function ElementsSidebar() {
  const { dragElementLayout, setDragElementLayout } = useDragAndDrop();

  const onDragLayoutStart = (layout) => {
    console.log("dragLayoutStart", layout);
    setDragElementLayout({
      dragLayout: { ...layout, id: Date.now() },
    });
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{"Layouts"}</h2>
        <div className="grid grid-cols-2 gap-4">
          {Layout.map((layout, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => {
                // e.preventDefault();
                onDragLayoutStart(layout);
              }}
            >
              <ElementLayoutCard layout={layout} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{"Elements"}</h2>
        <div className="grid grid-cols-2 gap-4">
          {ElementList.map((layout, index) => (
            <div key={index} draggable>
              <ElementLayoutCard layout={layout} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
