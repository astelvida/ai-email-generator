"use client";

import data, { layouts, blocks, LayoutOption } from "@/lib/data";
import { BlockType } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function DraggableElement({ item, id }: { item: BlockType | LayoutOption; id: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: item,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    backgroundColor: isDragging ? "yellow" : "",
    opacity: isDragging ? 0.5 : 1,
    // zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="group flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-gray-300 p-2 hover:border-indigo-600 hover:shadow-md">
        <div className="rounded-full bg-gray-100 p-2 group-hover:bg-indigo-100/50 group-hover:text-indigo-600">
          <item.icon className="h-5 w-5" />
        </div>
        <span className="text-center text-sm group-hover:text-indigo-600">{item.label}</span>
      </div>
    </div>
  );
}

export const ElementsSection = ({
  title,
  items,
}: {
  title: string;
  items: BlockType[] | LayoutOption[];
}) => {
  return (
    <div className="space-y-2">
      <h3 className="px-2 text-xs font-medium text-muted-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <DraggableElement key={item.type} id={item.type} item={item} />
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
        <ElementsSection title="Layouts" items={layouts} />
        <Separator />
        <ElementsSection title="Blocks" items={blocks} />
      </div>
    </div>
  );
}
