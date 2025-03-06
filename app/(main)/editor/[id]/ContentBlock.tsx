"use client";

import { ContentBlock as ContentBlockType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CustomSortableItem } from "./CustomSortableItem";
import { getElementComponent } from "./ElementRenderer";

interface ContentBlockProps {
  column: ContentBlockType;
  removeColumn: () => void;
  setActiveBlock: (blockId: string) => void;
}

export function ContentBlock({ column }: ContentBlockProps) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  return (
    <CustomSortableItem
      key={column.id}
      id={column.id}
      data={{
        ...column,
      }}
      className={cn(
        "group relative min-h-[50px] rounded-lg border-2 border-dashed border-purple-300 bg-purple-50 transition-colors hover:border-purple-300",
      )}
    >
      {!column.blocks?.length ? (
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-2 text-center text-purple-500 active:bg-yellow-100",
          )}
        >
          <PlusIcon className="h-6 w-6" />
          <p className="text-sm">Drop content blocks here</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 border-2 hover:border-teal-500">
          {column.blocks?.map((block, blockIndex) => (
            <CustomSortableItem key={block.id} id={block.id} data={block}>
              <div className="flex items-center justify-center">{getElementComponent(block)}</div>
            </CustomSortableItem>
          ))}
        </div>
      )}
    </CustomSortableItem>
  );
}
