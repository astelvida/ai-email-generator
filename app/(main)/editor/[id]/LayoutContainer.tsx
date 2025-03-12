"use client";

import { BlockType, ColumnType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { useMemo } from "react";
import { DeleteButton } from "./DeleteButton";
import { getElementComponent } from "./ElementRenderer";
import { SortableBlock } from "./SortableBlock";
import { SortableLayout } from "./SortableLayout";

interface LayoutContainerProps {
  layout: any;
  blocks: BlockType[];
  index: number;
  removeLayout: () => void;
  removeBlock: (blockId: string) => void;
  setSelectedElement: (blockId: string | null) => void;
  selectedElement: string | null;
  activeLayout: string | null;
  activeColumnId: string | null;
}

interface DroppableZoneProps {
  id: string;
  layoutId: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  index: number;
  gridColumn: number;
}

const DroppableColumn = (props: DroppableZoneProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: props.id,
    data: {
      type: "column",
      column: {
        id: props.id,
        index: props.index,
        layoutId: props.layoutId,
        gridColumn: props.gridColumn,
      },
    },
  });
  const borderClass = isOver ? "border-teal-500 bg-teal-200" : "border-teal-300 bg-teal-50";

  // Check if there are any actual children (not just empty arrays or null values)

  return (
    <div
      ref={setNodeRef}
      style={props.style}
      className={cn(
        "relative min-h-[100px] rounded-lg border-2 border-dashed p-4 transition-colors",
        borderClass,
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

export function LayoutContainer({
  layout,
  blocks,
  removeLayout,
  removeBlock,
  setSelectedElement,
  selectedElement,
  activeLayout,
  activeColumnId,
  index,
}: LayoutContainerProps) {
  const gridStyle = useMemo(() => {
    return {
      display: "grid",
      gap: "4px",
      gridTemplateColumns: layout.columns
        ?.map((col: ColumnType) => `${col.gridColumn}fr`)
        .join(" "),
    };
  }, [layout.columns]);

  return (
    <SortableLayout
      id={layout.id}
      data={layout}
      className={cn(
        "px-2 py-2 hover:border-2 hover:border-purple-500 hover:bg-opacity-50 active:border-dashed",
        selectedElement?.id === layout.id && "border-4 border-amber-500",
      )}
    >
      <DeleteButton removeElement={removeLayout} />

      <div onClick={() => setSelectedElement(layout)} style={gridStyle}>
        {layout.columns.map((column: ColumnType, columnIndex: number) => {
          const columnBlocks = blocks.filter((block) => block.columnId === column.id);
          const columnBlocksIds = columnBlocks.map((block) => block.id);

          return (
            <DroppableColumn
              key={column.id}
              id={column.id}
              index={columnIndex}
              layoutId={layout.id}
              gridColumn={column.gridColumn}
            >
              {columnBlocksIds.length ? (
                <SortableContext items={columnBlocksIds} strategy={verticalListSortingStrategy}>
                  <div className="flex flex-col gap-2">
                    {columnBlocks.map((block, blockIndex) => {
                      return (
                        <SortableBlock
                          key={block.id}
                          id={block.id}
                          data={{
                            ...block,
                            layoutId: layout.id,
                            columnId: column.id,
                            columnIndex,
                            layoutIndex: index,
                            index: blockIndex,
                          }}
                          className={cn(
                            "flex-1 border-2 p-2",
                            selectedElement?.id === block.id && "border-4 border-amber-500",
                          )}
                        >
                          <div
                            className="flex-1 border-2 p-2"
                            onClick={() => setSelectedElement(block)}
                          >
                            {getElementComponent(block)}
                          </div>
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
