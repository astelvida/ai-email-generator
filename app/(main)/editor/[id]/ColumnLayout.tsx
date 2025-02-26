"use client";

import { Droppable } from "@/components/Droppable";
import { BuilderElement, ElementConfig } from "@/lib/types";

import { cn } from "@/lib/utils";
import { LayoutConfig } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ListStartIcon, PlusIcon } from "lucide-react";
import { getElementComponent } from "./ElementRenderer";

const DroppableColumn = ({ colItem }: { colItem: BuilderElement }) => {
  return (
    <Droppable id={colItem.id}>
      <div className="flex h-[100px] items-center justify-center border-2 border-dashed border-sky-300/50 bg-sky-200 text-center text-xs">
        {getElementComponent(colItem) || colItem.id + "\nDrag something "}
      </div>
    </Droppable>
  );
};

export function ColumnLayout({ layout, index: rowIndex }: { layout: LayoutConfig; index: number }) {
  console.log(layout);

  return (
    <div
      style={{ display: "grid", gap: "0px", gridTemplateColumns: `repeat(${layout.columns}, 1fr)` }}
    >
      {layout.children?.map((colItem, index) => (
        <DroppableColumn key={colItem.id} colItem={{ ...colItem, index }} />
      ))}
    </div>
  );
}
