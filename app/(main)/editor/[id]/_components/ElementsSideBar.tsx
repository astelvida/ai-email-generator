"use client";

import { Button } from "@/components/ui/button";
import { LayoutConfig } from "../config";

export function ElementsSidebar() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-sm font-semibold">{LayoutConfig.heading}</h2>
        <div className="grid grid-cols-2 gap-2 ">
          {Object.entries(LayoutConfig.items).map(([itemKey, layout]) => (
            <Button
              key={itemKey}
              variant="outline"
              className="h-20 flex flex-col gap-2 justify-center border-dashed border-violet-300
                 group hover:border-violet-500 group hover:shadow-md cursor pointer rounded-lg p-2"
              draggable
              onClick={() => {
                console.log(layout);
              }}
            >
              <layout.myIcon className="h-4 w-4  transition-all duration-200  cursor-pointer group-hover:bg-violet-300/50 group-hover:text-violet-500" />
              <span className="text-xs group-hover:text-violet-500">
                {layout.label}
              </span>
            </Button>
          ))}
        </div>
        {/* {index < Object.entries(ElementsConfig.items).length - 1 && <Separator />} */}
      </div>
    </div>
  );
}
