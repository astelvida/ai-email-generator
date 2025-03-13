"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LAYOUT_OPTIONS, LayoutOption } from "@/lib/data";
import { cn, nanoid } from "@/lib/utils";
import { useViewStore } from "@/stores/view";
import {
  DndContext,
  DragCancelEvent,
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
import { useMemo, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { DroppableContentArea } from "./DroppableContentArea";
import { ElementsSidebar } from "./elements-sidebar/ElementsSidebar";
import { EmptyState } from "./EmptyState";
import { LayoutContainer } from "./LayoutContainer";
import { Settings } from "./settings/Settings";

const createNewColumns = (layoutId: string, templateColumns: number[]) => {
  return templateColumns.map((gridColumn: number, index: number) => ({
    id: nanoid() + "-column",
    type: "column",
    index,
    layoutId,
    gridColumn,
  }));
};

const createNewLayout = (data: LayoutOption) => {
  const layoutId = nanoid() + "-layout";
  return {
    id: layoutId,
    ...data,
    columns: createNewColumns(layoutId, data.columns),
  };
};

type CreateNewBlockProps = {
  data: any;
  columnId: string;
  layoutId: string;
};

const createNewBlock = ({ columnId, layoutId, ...data }: CreateNewBlockProps) => {
  return {
    id: nanoid() + "-block",
    columnId,
    layoutId,
    ...data,
  };
};

export function EmailBuilder() {
  const { view } = useViewStore();
  const [showPre, setShowPre] = useState(false);

  const [layouts, setLayouts] = useState<any[]>([]);
  const [blocks, setBlocks] = useState<any[]>([]);

  const [activeDraggable, setActiveDraggable] = useState<string | null>(null);
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

  const selectedStuff = useMemo(() => {
    return selectedElement?.endsWith("layout")
      ? layouts.find((layout) => layout.id === selectedElement)
      : blocks.find((block) => block.id === selectedElement);
  }, [selectedElement, layouts, blocks]);

  const addLayout = (layoutData: LayoutOption) => {
    const newLayout = createNewLayout(layoutData);
    setLayouts((prev) => {
      return [...prev, newLayout];
    });
    setSelectedElement(newLayout.id);
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
    setSelectedElement(null);
    console.log("DRAG START");
    const { active } = event;

    if (active.id) {
      console.log("ACTIVE ID", active.id);
      setActiveDraggable(active.id.toString());
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    const isActiveABlock = active.data.current?.type === "block";

    if (!over || active.id === over?.id || !isActiveABlock) {
      return;
    }
    // const isBlockOption = active.id.toString().startsWith("block");
    const isOverABlock = over?.data.current?.type === "block";
    const isOverAColumn = over?.data.current?.type === "column";

    console.log("DRAG OVER");
    // DRAG BLOCK OVER ANOTHER BLOCK
    if (isActiveABlock && isOverABlock) {
      setBlocks((blocks) => {
        const activeIndex = blocks.findIndex((block) => block.id === active.id);
        const overIndex = blocks.findIndex((block) => block.id === over.id);

        if (active.data.current?.block.columnId !== over.data.current?.block.columnId) {
          const newBlocks = blocks.map((block, index) => {
            if (index === activeIndex) {
              return {
                ...block,
                columnId: blocks[overIndex].columnId,
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

    // DRAG BLOCK OVER A COLUMN
    if (isActiveABlock && isOverAColumn) {
      console.log("MOVE BLOCK TO COLUMN");
      setBlocks((blocks) => {
        const activeIndex = blocks.findIndex((block) => block.id === active.id);

        const newBlocks = blocks.map((block, index) => {
          if (index === activeIndex) {
            return {
              ...block,
              columnId: over?.id.toString(),
              layoutId: over?.data.current?.column.layoutId,
            };
          }
          return block;
        });

        return newBlocks;
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over?.id) {
      setActiveDraggable(null);
      return;
    }
    const isActiveALayout = active.data.current?.type === "layout";
    const isOverALayout = over?.data.current?.type === "layout";
    const isLayoutOption = active.id.toString().startsWith("layout");

    const isOverAColumn = over?.data.current?.type === "column";
    // const isActiveABlock = active.data.current?.type === "block";
    const isBlockOption = active.id.toString().startsWith("block");

    if (isBlockOption && isOverALayout) {
      // if (over.id === "content-area") {
      unstable_batchedUpdates(() => {
        const newLayout = createNewLayout(LAYOUT_OPTIONS[0]);
        setLayouts((layouts) => [...layouts, newLayout]);

        const newBlock = createNewBlock({
          ...active.data.current?.block,
          columnId: newLayout.columns[0].id,
          layoutId: newLayout.id,
        });

        setBlocks((blocks) => [...blocks, newBlock]);
        setSelectedElement(newBlock.id);
      });
      // }
    }
    if (isBlockOption && isOverAColumn) {
      const newBlock = createNewBlock({
        ...active.data.current?.block,
        columnId: over.id.toString(),
        layoutId: over?.data.current?.column.layoutId,
      });
      setBlocks((blocks) => [...blocks, newBlock]);
      setSelectedElement(newBlock.id);
    }

    if (!isActiveALayout) {
      setActiveDraggable(null);
      return;
    }

    if (isLayoutOption) {
      console.log("ADD LAYOUT");
      addLayout(active.data.current?.layout);
    }

    if (!isLayoutOption) {
      console.log("MOVE LAYOUT");
      setLayouts((layouts) => {
        const activeIndex = layouts.findIndex((layout) => layout.id === active.id);
        const overIndex = layouts.findIndex((layout) => layout.id === over?.id);
        return arrayMove(layouts, activeIndex, overIndex);
      });
    }

    setActiveDraggable(null);
  }

  function handleDragCancel(event: DragCancelEvent) {
    console.log("DRAG CANCEL");
    setActiveDraggable(null);
    setSelectedElement(null);
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
      sensors={sensors}
    >
      <div className="flex flex-1 overflow-hidden">
        <ElementsSidebar disabled={layouts.length === 0} />
        <div
          className={cn(
            "border-grey-500 mx-auto w-full transition-all",
            view === "desktop" ? "max-w-3xl" : "max-w-md",
          )}
        >
          <pre className="text-xs">
            {JSON.stringify({ activeDraggable, selectedElement }, null, 2)}
          </pre>
          <DroppableContentArea className="h-full overflow-y-scroll border-2 border-dashed p-10">
            <div className="flex flex-col gap-2">
              {layouts.length === 0 ? (
                <EmptyState message="Drag a layout here to get started" />
              ) : (
                <SortableContext items={layoutIds} strategy={verticalListSortingStrategy}>
                  {layouts.map((layout) => (
                    <LayoutContainer
                      key={layout.id}
                      layout={layout}
                      blocks={blocks.filter((block) => block.layoutId === layout.id)}
                      selectedElement={selectedElement}
                      setSelectedElement={setSelectedElement}
                      removeLayout={() => removeLayout(layout.id)}
                      removeBlock={removeBlock}
                    />
                  ))}
                </SortableContext>
              )}
            </div>
          </DroppableContentArea>
        </div>

        <Settings selectedElement={selectedStuff} updateElement={() => {}} />
        {/* {createPortal(
            <DragOverlay>
              {activeDraggable?.search("layout") && (
                <div className="z-50 rounded-md border-2 border-dashed bg-cyan-200 p-2">
                  <ElementPreview element={layouts.find((layout) => layout.id === activeDraggable)} />
                </div> 
              )}
              {activeDraggable && (
                <div className="z-50 rounded-md border-2 border-dashed bg-cyan-200 p-2">
                  <ElementPreview element={blocks.find((block) => block.id === activeDraggable)} />
                </div>
              )}
            </DragOverlay>,
            document.body,
          )} */}
      </div>
      <Button
        className="absolute bottom-0 right-0 z-50"
        onClick={(e) => {
          // e.preventDefault();
          setShowPre(!showPre);
        }}
      >
        Toggle Pre
      </Button>

      <div className="bg-grey-100 absolute bottom-0 right-0 top-0">
        <ScrollArea
          className="w-[300px] rounded-md border-2 border-dashed border-blue-200 bg-pink-100"
          style={{ display: showPre ? "block" : "none" }}
        >
          <pre className="text-xs">
            {JSON.stringify({ activeDraggable, selectedElement }, null, 2)}
          </pre>
          <pre className="text-xs">{JSON.stringify({ layouts, blocks }, null, 2)}</pre>
        </ScrollArea>
      </div>
    </DndContext>
  );
}
