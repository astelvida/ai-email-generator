"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, nanoid, pprint } from "@/lib/utils";
import { useViewStore } from "@/stores/view";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
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
import { useState } from "react";
import { createPortal } from "react-dom";
import { DroppableContentArea } from "./DroppableContentArea";
import { ElementsSidebar } from "./ElementsSidebar";
import { EmptyState } from "./EmptyState";
import { LayoutContainer } from "./LayoutContainer";
import { Settings } from "./Settings";

const createNewLayout = (data: any) => {
  const layoutId = nanoid();

  return {
    id: layoutId,
    elementType: data.elementType,
    type: data.type,
    name: data.name,
    templateColumns: data?.templateColumns,

    columns: data?.templateColumns.map((gridColumn: number) => ({
      id: nanoid(),
      elementType: "column",
      type: "column",
      gridColumn,
      parentId: layoutId,
      blocks: [],
    })),
  };
};

export function EmailBuilder() {
  const { view } = useViewStore();
  const [showPre, setShowPre] = useState(false);

  const [layouts, setLayouts] = useState<any[]>([]);
  const [activeLayoutId, setActiveLayoutId] = useState<string | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const layoutIds = layouts.map((layout) => layout.id as UniqueIdentifier);

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

  const addLayout = (layoutData) => {
    setLayouts((prev) => {
      const newLayout = createNewLayout(layoutData);
      return [...prev, newLayout];
    });
  };

  // remove layout
  const removeLayout = (id: string) => {
    setLayouts((layouts) => layouts.filter((layout) => layout.id !== id));
  };

  function handleDragStart(event: DragStartEvent) {
    if (event.active.id.toString().startsWith("layout")) {
      return;
    }

    if (event.active.data.current?.elementType === "layout") {
      setActiveLayoutId(event.active.id as string);
      pprint(event.active.data.current.id, "active.data.current.id");
      pprint(event.active.id, "active.id");
    } else if (event.active.data.current?.elementType === "column") {
      setActiveColumnId(event.active.id as string);
    } else if (event.active.data.current?.elementType === "block") {
      setActiveBlockId(event.active.id as string);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveLayoutId(null);
    setActiveColumnId(null);
    setActiveBlockId(null);

    const { active, over } = event;

    pprint("EVENT ", "DRAG END");
    pprint(active.id, "active.id:");
    pprint(over?.id, "over.id:");
    pprint(active.data.current, "active.data.current");

    // Skip if there is no over element
    if (!over?.id) return;
    // Skip if the active element is the same as the over element
    if (active.id === over.id) return;

    if (active.id.toString().startsWith("layout")) {
      addLayout(active.data.current);
    }

    if (event.active.id.toString().startsWith("layout")) {
      return;
    }

    setLayouts((prev) => {
      const oldIndex = prev.findIndex((layout) => layout.id === active.id);
      const newIndex = prev.findIndex((layout) => layout.id === over?.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex flex-1 overflow-hidden">
        <ElementsSidebar />

        <div
          className={cn(
            "border-grey-500 mx-auto w-full transition-all",
            view === "desktop" ? "max-w-3xl" : "max-w-md",
          )}
        >
          <DroppableContentArea className="h-full overflow-y-scroll border-2 border-dashed p-10">
            <div className="flex flex-col gap-2">
              {layouts.length === 0 ? (
                <EmptyState message="Drag a layout here to get started" />
              ) : (
                <SortableContext items={layoutIds} strategy={verticalListSortingStrategy}>
                  {layoutIds.map((layoutId, index) => (
                    <LayoutContainer
                      key={layoutId}
                      index={index}
                      layout={layouts.find((layout) => layout.id === layoutId)}
                      removeLayout={() => removeLayout(layoutId)}
                      activeLayout={activeLayoutId}
                      activeColumn={activeColumnId}
                      activeBlock={activeBlockId}
                      setActiveLayout={setActiveLayoutId}
                      setActiveColumn={setActiveColumnId}
                      setActiveBlock={setActiveBlockId}
                    />
                  ))}
                </SortableContext>
              )}
            </div>
          </DroppableContentArea>
          {createPortal(
            <DragOverlay>
              {activeLayoutId && (
                <LayoutContainer
                  layout={layouts.find((layout) => layout.id === activeLayoutId)}
                  index={layouts.findIndex((layout) => layout.id === activeLayoutId)}
                  removeLayout={() => removeLayout(activeLayoutId)}
                  activeLayout={activeLayoutId}
                  activeColumn={activeColumnId}
                  activeBlock={activeBlockId}
                  setActiveLayout={setActiveLayoutId}
                  setActiveColumn={setActiveColumnId}
                  setActiveBlock={setActiveBlockId}
                />
              )}
            </DragOverlay>,
            document.body,
          )}
        </div>

        <Settings selectedElement={layouts[0]} updateElement={() => {}} />
      </div>
      <Button onClick={() => setShowPre(!showPre)}>Toggle Pre</Button>

      <div className="bg-grey-100 absolute bottom-0 right-0 top-0">
        <ScrollArea
          className="w-[500px] rounded-md border-2 border-dashed border-blue-200 bg-pink-100"
          style={{ display: showPre ? "block" : "none" }}
        >
          <pre className="text-xs">{JSON.stringify(layouts, null, 2)}</pre>q
          <pre className="text-xs">
            {JSON.stringify({ activeLayoutId, activeColumnId, activeBlockId }, null, 2)}
          </pre>
        </ScrollArea>
      </div>
    </DndContext>
  );
}
