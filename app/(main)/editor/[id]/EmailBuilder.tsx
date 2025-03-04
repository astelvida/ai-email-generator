"use client";

// import { useEmailBuilder } from "@/providers/email-builder-context";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
// import { Settings } from "./Settings";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ElementsSidebar } from "./ElementsSidebar";
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useState, useMemo } from "react";

import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { initialElements } from "@/lib/initial-data";
import { BuilderElement } from "@/lib/types";
import { useDroppable } from "@dnd-kit/core";
import { useViewStore } from "@/stores/view";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Settings } from "./Settings";
import { DroppableContentArea } from "./DroppableContentArea";
import { EmptyState } from "./EmptyState";
import { v4 as uuidv4 } from "uuid";
interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

export function SortableItem(props: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
}

export function EmailBuilder() {
  const [layouts, setLayouts] = useState<BuilderElement[]>(initialElements);
  const [activeElementId, setActiveElementId] = useState<string | null>(null);
  const [activeLayoutId, setActiveLayoutId] = useState<string | null>(null);
  const { view } = useViewStore();
  // const { isOver, setNodeRef } = useDroppable({
  //   id: "droppable-canvas",
  // });

  const layoutIds = useMemo(
    () => layouts.map((element) => element.id as UniqueIdentifier),
    [layouts],
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveLayoutId(event.active.id as string);
    setActiveElementId(event.active.id as string);
    console.log("drag start", event);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log("drag end", active, over);

    if (active.id.toString().startsWith("layout")) {
      console.log("layout");

      setLayouts((layouts) => [
        ...layouts,
        {
          id: `block-${uuidv4()}`,
          ...active.data.current,
          children: Array.from({ length: parseInt(active.data.current?.columns) }, () => null),
        },
      ]);
    } else {
      if (active.id !== over?.id) {
        setLayouts((layouts) => {
          const oldIndex = layouts.findIndex((layout) => layout.id === active.id);
          const newIndex = layouts.findIndex((layout) => layout.id === over.id);

          return arrayMove(layouts, oldIndex, newIndex);
        });
      }
    }
  }

  const gridColsProp = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <div className="flex flex-1 overflow-hidden">
        <ElementsSidebar />

        <DroppableContentArea>
          <div className="flex flex-col gap-6 p-6">
            {layouts.length === 0 ? (
              <EmptyState message="Drag a layout here to get started" />
            ) : (
              <ScrollArea className="mx-auto h-full w-full max-w-[1000px] border-2 border-dashed border-gray-300 p-10">
                <SortableContext items={layoutIds} strategy={verticalListSortingStrategy}>
                  {layoutIds.map((id, index) => (
                    <SortableItem key={id} id={id}>
                      <div
                        className={cn(`grid ${gridColsProp[layouts[index]?.columns]} gap-4 py-4`)}
                      >
                        {layouts[index].children?.map((column, columnIndex) => (
                          <div
                            className="h-[50px] w-full border-2 border-dotted border-gray-100"
                            key={columnIndex}
                          >
                            Drag a component here
                          </div>
                        ))}
                      </div>
                    </SortableItem>
                  ))}
                </SortableContext>
              </ScrollArea>
            )}
          </div>
        </DroppableContentArea>
        <Settings selectedElement={layouts[0]} updateElement={() => {}} />
      </div>
    </DndContext>
  );
}
