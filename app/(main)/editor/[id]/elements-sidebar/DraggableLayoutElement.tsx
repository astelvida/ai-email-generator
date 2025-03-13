"use client";

import { LayoutOption } from "@/lib/data";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function DraggableLayoutItem({
  layout,
  onClick,
}: {
  layout: LayoutOption;
  onClick?: () => void;
}) {
  // const layoutType = `layout-${layout.columns.length}-columns-${layout.columns.join("-")}-option`;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `layout-${layout.type}`,
    data: {
      type: "layout",
      layout: layout,
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        zIndex: 999,
      }}
      className={`cursor-grab ${isDragging ? "opacity-50" : ""}`}
      {...listeners}
      {...attributes}
    >
      <button type="button" className="w-full justify-start p-3" onClick={onClick}>
        <div className="w-full">
          <div className="flex gap-1">
            {layout.colWidths.map((colWidth, index) => (
              <div
                key={index}
                className="flex h-8 items-center justify-center rounded border-2 border-dashed border-purple-200 bg-purple-50 text-xs"
                style={{ width: `${colWidth}` }}
              >
                {colWidth}
              </div>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
}
