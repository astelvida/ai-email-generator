"use client";

import { Separator } from "@/components/ui/separator";
import { BLOCK_OPTIONS, LAYOUT_OPTIONS, LayoutOptionWithIcons } from "@/lib/data";
import { BlockElement } from "@/lib/types";
import { memo } from "react";
import { DraggableBlockElement } from "./DraggableBlockElement";
import { DraggableLayoutItem } from "./DraggableLayoutElement";

export const ElementsSection = ({
  title,
  elements,
  sectionKey,
  // onAddBlock,
}: {
  title: string;
  elements: (BlockElement | LayoutOptionWithIcons)[];
  sectionKey: string;
  // onAddBlock: (block: BlockType) => void;
}) => {
  return (
    <div className="space-y-2">
      <h3 className="px-2 text-xs font-medium text-muted-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {elements.map(({ icon: IconComponent, ...element }) => (
          <DraggableBlockElement key={element.type} elementType={sectionKey} element={element}>
            <div className="group flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-gray-300 p-2 hover:border-indigo-600 hover:shadow-md">
              <div className="rounded-full bg-gray-100 p-2 group-hover:bg-indigo-100/50 group-hover:text-indigo-600">
                <IconComponent className="h-5 w-5" />
              </div>
              <span className="text-center text-sm group-hover:text-indigo-600">
                {element.label}
              </span>
            </div>
          </DraggableBlockElement>
        ))}
      </div>
    </div>
  );
};

function ElementsSidebarComponent({ disabled }: { disabled: boolean }) {
  return (
    <div className="w-72 overflow-y-auto border-l bg-gray-50 p-4">
      {disabled && (
        <div className="text-smz mb-4 rounded-md bg-yellow-50 p-3 text-yellow-800">
          Add a layout first to insert content blocks
        </div>
      )}
      <h3 className="mb-3 font-medium">Layouts</h3>
      <div className="mb-8 space-y-2">
        {LAYOUT_OPTIONS.map((layout) => (
          <DraggableLayoutItem key={layout.type} layout={layout} />
        ))}
      </div>
      <Separator />
      <Separator className="my-4" />
      <h3 className="mb-3 font-medium">Content Blocks</h3>
      <div className="grid grid-cols-3 gap-2">
        {BLOCK_OPTIONS.map(({ icon: IconComponent, ...block }) => (
          <DraggableBlockElement key={block.label} elementType={"block"} element={block}>
            <div className="group flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-gray-300 p-2 hover:border-indigo-600 hover:shadow-md">
              <div className="rounded-full bg-gray-100 p-2 group-hover:bg-indigo-100/50 group-hover:text-indigo-600">
                <IconComponent className="h-5 w-5" />
              </div>
              <span className="text-center text-sm group-hover:text-indigo-600">{block.label}</span>
            </div>
          </DraggableBlockElement>
        ))}
      </div>
    </div>
  );
}

export const ElementsSidebar = memo(ElementsSidebarComponent);
