"use client";

import { Layout } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { ContentBlock } from "./ContentBlock";
import { DeleteButton } from "./DeleteButton";
interface LayoutContainerProps {
  layout: Layout;
  removeLayout: () => void;
  activeLayout: string;
}

export function LayoutContainer({
  layout,
  removeLayout,
  activeLayout,
  setActiveColumn,
}: LayoutContainerProps) {
  const columnsIds = useMemo(
    () => layout.columns?.map((column: Column) => column.id),
    [layout.columns],
  );

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: layout.id,
    data: {
      ...layout,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={cn(
        "group relative border-0 bg-white px-4 py-2 transition-colors hover:border-2 hover:border-purple-500 hover:bg-opacity-50 active:border-dashed",
        activeLayout === layout.id && "border-3 border-fuchsia-500",
      )}
    >
      <DeleteButton removeElement={removeLayout} />
      <div
        style={{
          display: "grid",
          gap: "2px",
          gridTemplateColumns: layout.columns?.map((col) => `${col.gridColumn}fr`).join(" "),
        }}
      >
        <SortableContext items={columnsIds}>
          {columnsIds?.map((columnId, columnIndex) => (
            <ContentBlock
              key={columnId}
              setActiveColumn={setActiveColumn}
              column={layout.columns?.find((column) => column.id === columnId)}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
