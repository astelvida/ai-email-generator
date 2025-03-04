"use client";

import { SortableContext, useSortable, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getElementComponent } from "./ElementRenderer";
import { SortableItem } from "./SortableItem";

interface LayoutContainerProps {
  id: string;
  layout: any;
  index: number;
  handleRemove: (id: string, index: number) => void;
}

export function LayoutContainer({ id, layout, index, handleRemove }: LayoutContainerProps) {
  console.log("layout", layout);

  const blocksIds = layout.children?.map((block, blockIndex) => `${index}-${blockIndex}`);

  const gridColsProp = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <SortableItem
      id={id}
      data={{
        type: layout.type,
        id: layout.id,
        index,
      }}
    >
      <div className="group relative m-4 border-2 border-gray-200 bg-white shadow-sm transition-colors hover:border-purple-500">
        <Button
          variant="destructive"
          size="sm"
          className="absolute -right-3 -top-3 h-7 w-7 rounded-full bg-red-500 p-0 text-white hover:bg-red-600"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleRemove(id as string, index);
          }}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove layout</span>
        </Button>

        <div className={cn(`grid ${gridColsProp[layout?.columns]} gap-2 p-2`)}>
          <SortableContext items={blocksIds} strategy={rectSortingStrategy}>
            {layout.children?.map((column, columnIndex) => (
              <SortableItem
                key={blocksIds[columnIndex]}
                id={blocksIds[columnIndex]}
                data={{
                  id: column.id,
                  type: column.type,
                  parentIndex: index,
                  index: columnIndex,
                }}
              >
                <div
                  className={`relative min-h-[100px] rounded-lg border-2 border-dashed border-purple-300 bg-purple-50 p-4 transition-colors`}
                >
                  {!column ? (
                    <div className="flex flex-col items-center justify-center gap-2 text-center text-purple-500">
                      <Plus className="h-6 w-6" />
                      <p className="text-sm">Drop content blocks here</p>
                    </div>
                  ) : (
                    getElementComponent(column)
                  )}
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </div>
      </div>
    </SortableItem>
  );
}
