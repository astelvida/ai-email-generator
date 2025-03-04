"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from "@dnd-kit/core";
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
import { useViewStore } from "@/stores/view";
import { Settings } from "./Settings";
import { DroppableContentArea } from "./DroppableContentArea";
import { EmptyState } from "./EmptyState";
import { v4 as uuidv4 } from "uuid";
import { LayoutContainer } from "./LayoutContainer";
import { useImmer } from "use-immer";

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
  const [layouts, setLayouts] = useImmer<BuilderElement[]>(initialElements);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [activeLayoutId, setActiveLayoutId] = useState<string | null>(null);
  const { view } = useViewStore();

  const layoutIds = useMemo(
    () => layouts.map((layout) => layout.id as UniqueIdentifier),
    [layouts],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveLayoutId(event.active.id as string);
    setActiveBlockId(event.active.id as string);
    console.log("drag start", event);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log("active", active.id);
    console.log("over", over?.id);

    setLayouts((layouts) => {
      const oldIndex = layouts.findIndex((layout) => layout.id === active.id);
      const newIndex = layouts.findIndex((layout) => layout.id === over?.id);

      return arrayMove(layouts, oldIndex, newIndex);
    });

    function createNewLayout() {
      return {
        id: `block-${uuidv4()}`,
        ...active.data.current,
        children: Array.from({ length: parseInt(active.data.current?.columns) }, () => null),
      };
    }

    if (active.id.toString().startsWith("layout")) {
      setLayouts((layouts) => {
        const newLayout = createNewLayout();
        const nextLayouts = [...layouts, newLayout];

        const oldIndex = nextLayouts.length - 1;
        const newIndex = nextLayouts.findIndex((layout) => layout.id === over?.id);

        return arrayMove(nextLayouts, oldIndex, newIndex);
      });
    } else if (!active.id.toString().startsWith("layout")) {
      const [layoutIndexOld, colIndexOld] = active.id.toString().split("-").map(Number);
      const [layoutIndexNew, colIndexNew] = over?.id.toString().split("-").map(Number);

      console.log("layoutIndexOld", layoutIndexOld);
      console.log("colIndexOld", colIndexOld);
      console.log("layoutIndexNew", layoutIndexNew);
      console.log("colIndexNew", colIndexNew);

      if (layoutIndexOld === layoutIndexNew) {
        setLayouts((layouts) => {
          return layouts.map((layout, idx) => {
            if (idx === layoutIndexNew) {
              return {
                ...layout,
                children: arrayMove(layout.children, colIndexOld, colIndexNew),
              };
            }
            return layout;
          });
        });
      } else if (isNaN(layoutIndexOld)) {
        setLayouts((layouts) => {
          // const [layoutIndex, colIndex] = over?.id.toString().split("-").map(Number);

          console.log(active.data.current);
          const newLayouts = layouts.map((layout, index) => {
            if (index === layoutIndexNew) {
              return {
                ...layout,
                children: layout.children?.map((child, childIndex) =>
                  childIndex === colIndexNew ? { ...child, ...active.data.current } : child,
                ),
              };
            }
            return layout;
          });

          console.log("newLayouts", newLayouts);

          return newLayouts;
        });
      }
    }
    setActiveLayoutId(null);
    setActiveBlockId(null);
  }

  // remove layout
  function handleRemove(id: string, index: number) {
    setLayouts((layouts) => {
      return layouts.filter((layout) => layout.id !== id);
    });
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <div className="flex flex-1 overflow-hidden">
        <ElementsSidebar />

        <DroppableContentArea
          className={cn(
            "mx-auto border-2 border-dashed border-gray-500",
            layouts.length > 1 && "border-purple-300",
            view === "desktop" ? "w-full max-w-2xl" : "w-full max-w-md",
          )}
        >
          {layouts.length === 0 ? (
            <EmptyState message="Drag a layout here to get started" />
          ) : (
            <ScrollArea>
              <SortableContext items={layoutIds} strategy={verticalListSortingStrategy}>
                {layouts.map((layout, index) => (
                  <LayoutContainer
                    key={layout.id}
                    id={layout.id}
                    index={index}
                    layout={layout}
                    handleRemove={handleRemove}
                    blocks={layout.children}
                  />
                ))}
              </SortableContext>
            </ScrollArea>
          )}
        </DroppableContentArea>

        <Settings selectedElement={layouts[0]} updateElement={() => {}} />
      </div>
    </DndContext>
  );
}
