"use client";

import { Separator } from "@/components/ui/separator";
import { blockOptions, LayoutOption, layoutOptions } from "@/lib/data";
import { BlockType } from "@/lib/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type DraggableElementProps = {
  element: Omit<BlockType, "icon"> | Omit<LayoutOption, "icon">;
  elementType: string;
  children: React.ReactNode;
};
export function DraggableElement({ element, elementType, ...props }: DraggableElementProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${elementType}-${element.type}`,
    data: {
      [elementType]: element,
      type: elementType,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 999 : "auto",
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

export const ElementsSection = ({
  title,
  elements,
  sectionKey,
}: {
  title: string;
  elements: (BlockType | LayoutOption)[];
  sectionKey: string;
}) => {
  return (
    <div className="space-y-2">
      <h3 className="px-2 text-xs font-medium text-muted-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {elements.map(({ icon: IconComponent, ...element }) => (
          <DraggableElement key={element.type} elementType={sectionKey} element={element}>
            <div className="group flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-gray-300 p-2 hover:border-indigo-600 hover:shadow-md">
              <div className="rounded-full bg-gray-100 p-2 group-hover:bg-indigo-100/50 group-hover:text-indigo-600">
                <IconComponent className="h-5 w-5" />
              </div>
              <span className="text-center text-sm group-hover:text-indigo-600">
                {element.label}
              </span>
            </div>
          </DraggableElement>
        ))}
      </div>
    </div>
  );
};

export function ElementsSidebar() {
  return (
    <div className="w-64 border-r bg-background">
      <div className="flex h-12 items-center border-b px-4">
        <h2 className="text-sm font-semibold">Elements</h2>
      </div>
      <div className="space-y-6 p-4">
        <ElementsSection sectionKey="layout" title="Layouts" elements={layoutOptions} />
        <Separator />
        <ElementsSection sectionKey="block" title="Blocks" elements={blockOptions} />
      </div>
    </div>
  );
}
