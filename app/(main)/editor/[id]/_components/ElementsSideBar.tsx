"use client";

import ElementList from "@/lib/configs/ElementList";
import Layout from "@/lib/configs/Layout";
import { ElementLayoutCard } from "./ElementLayoutCard";
export function ElementsSidebar() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{"Layouts"}</h2>
        <div className="grid grid-cols-2 gap-4">
          {Layout.map((layout) => (
            <ElementLayoutCard key={layout.label} layout={layout} />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{"Elements"}</h2>
        <div className="grid grid-cols-2 gap-4">
          {ElementList.map((layout) => (
            <ElementLayoutCard key={layout.type} layout={layout} />
          ))}
        </div>
      </div>
    </div>
  );
}
