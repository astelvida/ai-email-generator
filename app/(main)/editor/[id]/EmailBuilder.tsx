"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, nanoid, pprintMultiple } from "@/lib/utils";
import { useViewStore } from "@/stores/view";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { DroppableContentArea } from "./DroppableContentArea";
import { ElementsSidebar } from "./ElementsSidebar";
import { EmptyState } from "./EmptyState";
import { LayoutContainer } from "./LayoutContainer";
import { Settings } from "./settings/Settings";

const createNewColumns = (layoutId: string, templateColumns: number[]) => {
  return templateColumns.map((gridColumn: number, index: number) => ({
    id: nanoid() + "-column",
    index,
    layoutId,
    gridColumn,
  }));
};

const createNewLayout = (data: any) => {
  const layoutId = nanoid() + "-layout";
  return {
    id: layoutId,
    type: data.type,
    name: data.name,
    label: data.label,
    templateColumns: data?.templateColumns,
    columns: createNewColumns(layoutId, data.templateColumns),
  };
};

const createNewBlock = (
  data: any,
  { columnId, columnIndex, layoutId }: { columnId: string; columnIndex: number; layoutId: string },
) => {
  return {
    id: nanoid() + "-block",
    ...data,
    columnId,
    columnIndex,
    layoutId,
  };
};

export function EmailBuilder() {
  const { view } = useViewStore();
  const [showPre, setShowPre] = useState(false);

  const [layouts, setLayouts] = useState<any[]>([]);
  const [blocks, setBlocks] = useState<any[]>([]);

  const [activeLayout, setActiveLayout] = useState<string | null>(null);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const layoutIds = useMemo(
    () => layouts.map((layout) => layout.id as UniqueIdentifier),
    [layouts],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    console.log(blocks);
  }, [blocks]);

  const addLayout = (layoutData: any) => {
    setLayouts((prev) => {
      const newLayout = createNewLayout(layoutData);
      return [...prev, newLayout];
    });
  };

  // remove layout
  const removeLayout = (id: string) => {
    setLayouts((layouts) => layouts.filter((layout) => layout.id !== id));
    setBlocks((blocks) => blocks.filter((block) => block.layoutId !== id));
  };

  const removeBlock = (id: string) => {
    setBlocks((blocks) => blocks.filter((block) => block.id !== id));
  };

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    if (active.data.current?.type === "layout") {
      setActiveLayout(active.data.current?.layout.id);
    } else if (active.data.current?.type === "block") {
      setActiveBlock(active.data.current?.block.id);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    if (active.id.toString().startsWith("block")) {
      const newBlock = createNewBlock(active.data.current?.block, {
        columnId: over.id.toString(),
        layoutId: over?.data.current?.column.layoutId,
        columnIndex: over?.data.current?.column.index,
      });
      console.log("NEW BLOCK", newBlock);
      setBlocks((blocks) => [...blocks, newBlock]);
    }

    if (active.data.current?.type !== "layout") {
      return;
    }

    const isAddingLayout = active.data.current?.layout.type.endsWith("empty");

    if (isAddingLayout && over.id === "content-area") {
      console.log("ADD LAYOUT");
      addLayout(active.data.current?.layout);
    }

    if (over.data.current?.type === "layout" && !activeLayout?.endsWith("empty")) {
      console.log("MOVE LAYOUT");
      setLayouts((layouts) => {
        const activeIndex = layouts.findIndex((layout) => layout.id === active.id);
        const overIndex = layouts.findIndex((layout) => layout.id === over?.id);
        return arrayMove(layouts, activeIndex, overIndex);
      });
    }

    setActiveLayout(null);
    setActiveBlock(null);
    setSelectedElement(null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const isActiveABlock = active.data.current?.type === "block";
    if (!isActiveABlock || active.id.toString().startsWith("block")) {
      return;
    }

    console.log("DRAG OVER");
    const isOverABlock = over?.data.current?.type === "block";

    // SORTYBLOPCKS
    if (isActiveABlock && isOverABlock) {
      console.log("MOVE BLOCK");
      setBlocks((blocks) => {
        const activeIndex = blocks.findIndex((block) => block.id === active.id);
        const overIndex = blocks.findIndex((block) => block.id === over.id);

        console.log("ACTIVE INDEX", activeIndex);
        console.log("OVER INDEX", overIndex);

        if (active.data.current?.block.columnId !== over.data.current?.block.columnId) {
          const newBlocks = blocks.map((block, index) => {
            if (index === activeIndex) {
              return {
                ...block,
                columnId: blocks[overIndex].columnId,
                columnIndex: blocks[overIndex].columnIndex,
                layoutId: blocks[overIndex].layoutId,
              };
            }
            return block;
          });
          return newBlocks;
        }

        return arrayMove(blocks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over?.data.current?.type === "column";

    if (isActiveABlock && isOverAColumn) {
      console.log("MOVE BLOCK TO COLUMN");
      pprintMultiple([
        ["activeId", active.id],
        ["overId", over?.id],
      ]);
      pprintMultiple([["over.data.current.column", over?.data.current?.column]]);
      pprintMultiple([["active.data.current.block", active.data.current?.block]]);

      setBlocks((blocks) => {
        const activeIndex = blocks.findIndex((block) => block.id === active.id);

        const newBlocks = blocks.map((block, index) => {
          if (index === activeIndex) {
            return {
              ...block,
              columnId: over?.id.toString(),
              columnIndex: over?.data.current?.column.index,
              layoutId: over?.data.current?.column.layoutId,
            };
          }
          return block;
        });
        return arrayMove(newBlocks, activeIndex, activeIndex);
      });
    }
    setActiveLayout(null);
    setActiveBlock(null);
    setSelectedElement(null);
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <div className="flex flex-1 overflow-hidden">
        <ElementsSidebar />
        <div
          className={cn(
            "border-grey-500 mx-auto w-full transition-all",
            view === "desktop" ? "max-w-3xl" : "max-w-md",
          )}
        >
          <pre className="text-xs">
            {JSON.stringify(
              { activeLayout, activeBlock, selectedElement: selectedElement?.id },
              null,
              2,
            )}
          </pre>
          <DroppableContentArea className="h-full overflow-y-scroll border-2 border-dashed p-10">
            <div className="flex flex-col gap-2">
              {layouts.length === 0 ? (
                <EmptyState message="Drag a layout here to get started" />
              ) : (
                <SortableContext items={layoutIds} strategy={verticalListSortingStrategy}>
                  {layouts.map((layout, layoutIndex) => (
                    <LayoutContainer
                      key={layout.id}
                      index={layoutIndex}
                      layout={layout}
                      blocks={blocks.filter((block) => block.layoutId === layout.id)}
                      removeLayout={() => removeLayout(layout.id)}
                      removeBlock={removeBlock}
                      activeLayout={activeLayout}
                      activeBlock={activeBlock}
                      // activeId={activeId}
                      selectedElement={selectedElement}
                      setSelectedElement={setSelectedElement}
                    />
                  ))}
                </SortableContext>
              )}
            </div>
          </DroppableContentArea>
          {/* {createPortal(
            <DragOverlay>
              {activeLayout && (
                <LayoutContainer
                  layout={layouts.find((layout) => layout.id === activeLayout)}
                  index={layouts.findIndex((layout) => layout.id === activeLayout)}
                  removeLayout={() => removeLayout(activeLayout)}
                  activeLayout={activeLayout}
                  activeColumn={activeColumnId}
                  activeBlock={activeBlock}
                  setActiveLayout={setActiveLayout}
                  setActiveColumn={setActiveColumnId}
                  setActiveBlock={setActiveBlock}
                />
              )}
            </DragOverlay>,
            document.body,
          )} */}
        </div>

        <Settings selectedElement={layouts[0]} updateElement={() => {}} />
      </div>
      <Button onClick={() => setShowPre(!showPre)}>Toggle Pre</Button>

      <div className="bg-grey-100 absolute bottom-0 right-0 top-0">
        <ScrollArea
          className="w-[300px] rounded-md border-2 border-dashed border-blue-200 bg-pink-100"
          style={{ display: showPre ? "block" : "none" }}
        >
          <pre className="text-xs">
            {JSON.stringify(
              { activeLayout, activeBlock, selectedElement: selectedElement },
              null,
              2,
            )}
          </pre>
          <pre className="text-xs">{JSON.stringify({ layouts, blocks }, null, 2)}</pre>
        </ScrollArea>
      </div>
    </DndContext>
  );
}
