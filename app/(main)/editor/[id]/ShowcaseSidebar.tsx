"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BLOCK_OPTIONS, LAYOUT_OPTIONS } from "@/lib/constants";
import type { Layout } from "@/lib/types";
import { useDraggable } from "@dnd-kit/core";

function DraggableLayoutItem({ layout, onClick }: { layout: Layout; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `layout-${layout.id}`,
    data: {
      type: "layout",
      layout,
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={
        transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              zIndex: 999,
            }
          : undefined
      }
      className={`cursor-grab ${isDragging ? "opacity-50" : ""}`}
      {...listeners}
      {...attributes}
    >
      <Button variant="outline" className="w-full justify-start p-3" onClick={onClick}>
        <div className="w-full">
          <div className="flex gap-1">
            {layout.columns.map((width, i) => (
              <div
                key={i}
                className="flex h-8 items-center justify-center rounded border-2 border-dashed border-purple-200 bg-purple-50 text-xs"
                style={{ width: `${(width / 12) * 100}%` }}
              >
                {width}
              </div>
            ))}
          </div>
        </div>
      </Button>
    </div>
  );
}

interface SidebarProps {
  onAddBlock: (blockType: string) => void;
  onSelectLayout: (layout: Layout) => void;
  disabled?: boolean;
}

export function ShowcaseSidebar({ onAddBlock, onSelectLayout, disabled = false }: SidebarProps) {
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
          <DraggableLayoutItem
            key={layout.id}
            layout={layout}
            onClick={() => onSelectLayout(layout)}
          />
        ))}
      </div>

      <Separator className="my-4" />

      <h3 className="mb-3 font-medium">Content Blocks</h3>
      <div className="grid grid-cols-3 gap-2">
        {BLOCK_OPTIONS.map((block) => (
          <DraggableBlockOption
            key={block.label}
            icon={block.icon}
            label={block.label}
            type={block.type}
            onClick={() => onAddBlock(block.label)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
