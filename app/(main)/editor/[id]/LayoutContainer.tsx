"use client";

import { BlockElement, ColumnType, LayoutType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { closestCenter, useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus } from "lucide-react";
import { DeleteButton } from "./DeleteButton";
import { ElementPreview } from "./ElementPreview";
import { SortableBlock } from "./SortableBlock";
import { SortableLayout } from "./SortableLayout";

export function SortableColumn(props: SortableColumnProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } =
    useSortable({
      id: props.id,
      data: {
        column: {
          id: props.id,
          layoutId: props.layoutId,
          gridColumn: props.gridColumn,
          type: "column",
        },
        type: "column",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      onClick={props.onClick}
      {...attributes}
      {...listeners}
      style={{ ...style, ...(props.style || {}) }}
      className={cn(
        `relative cursor-grab active:cursor-grabbing ${isSorting ? "z-10" : ""}`,
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

interface DroppableColumnProps {
  id: string;
  data: ColumnType;
  children: React.ReactNode;
  className?: string;
}
const DroppableColumn = ({ children, id, data, className }: DroppableColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: "column",
      column: data,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative h-[100px] rounded-lg border-2 border-dashed border-teal-300 bg-teal-100/50 p-2 transition-colors hover:border-solid hover:bg-teal-100",
        isOver ? "border-teal-500 bg-teal-200" : "",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface LayoutContainerProps {
  layout: LayoutType;
  blocks: BlockElement[];
  removeLayout: () => void;
  removeBlock: (blockId: string) => void;
  setSelectedElement: (blockId: string | null) => void;
  selectedElement: string | null;
}

export function LayoutContainer({
  layout,
  blocks,
  setSelectedElement,
  selectedElement,
  removeLayout,
  removeBlock,
}: LayoutContainerProps) {
  return (
    <SortableLayout
      id={layout.id}
      data={layout}
      className={cn(
        "hover:border-2 hover:border-purple-500 hover:bg-opacity-50",
        selectedElement === layout.id && "border-4 border-amber-500",
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedElement(layout.id);
      }}
    >
      <DeleteButton removeElement={removeLayout} />

      <div style={layout.gridStyle}>
        {layout.columns.map((column: ColumnType) => {
          const blocksInColumn = blocks.filter((block) => block?.columnId === column.id);
          const blockIds = blocksInColumn.map((block) => block.id);
          if (blockIds.find((id) => id === undefined)) {
            console.warn("Some block ids are false", blockIds);
            alert("Some block ids are false");
          }
          return (
            <DroppableColumn
              key={column.id}
              id={column.id}
              data={{
                ...column,
              }}
            >
              {blockIds.length ? (
                <SortableContext
                  items={blockIds}
                  strategy={verticalListSortingStrategy}
                  collisionDetection={closestCenter}
                >
                  <div className="flex flex-col">
                    {blocksInColumn.map((block) => {
                      return (
                        <SortableBlock
                          id={block.id}
                          key={block.id}
                          data={block}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedElement(block.id);
                          }}
                          className={cn(selectedElement === block.id && "ring-2 ring-teal-700")}
                        >
                          <ElementPreview element={block} />
                        </SortableBlock>
                      );
                    })}
                  </div>
                </SortableContext>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-teal-500">
                  <Plus className="h-6 w-6" />
                  <p className="text-sm">Drop content blocks here</p>
                </div>
              )}
            </DroppableColumn>
          );
        })}
      </div>
    </SortableLayout>
  );
}
