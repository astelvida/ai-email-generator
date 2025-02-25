"use client";

import { useEffect, useRef, useState } from "react";
import { useToggleView } from "@/providers/ToggleViewProvider";
import { useTemplate } from "@/providers/TemplateProvider";
import { useDragAndDrop } from "@/providers/DragAndDropProvider";
import { ColumnLayout } from "./ColumnLayout";
import { LayoutConfig, LayoutWithId } from "@/lib/types/config.types";

export function Canvas() {
  const { view } = useToggleView();
  const [isDragging, setIsDragging] = useState(false);
  const { template, setTemplate } = useTemplate();
  const { dragElementLayout } = useDragAndDrop();
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = () => {
    setIsDragging(false);

    if (dragElementLayout?.dragLayout) {
      setTemplate((prev) => {
        return [...prev, dragElementLayout?.dragLayout];
      });
    }
  };

  const getLayoutComponent = (layout: LayoutWithId) => {
    if (layout.type === "column") {
      return <ColumnLayout layout={layout} />;
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <div
        className={`w-full p-6 ${view == "desktop" ? "max-w-2xl" : "max-w-md"} ${isDragging ? "bg-purple-100" : "bg-white"} `}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        ref={canvasRef}
      >
        {template.length ? (
          template.map((layout, index) => <div key={index}>{getLayoutComponent(layout)}</div>)
        ) : (
          <div className="flex h-full items-center justify-center">
            <p>Drag a layout here to start</p>
          </div>
        )}
      </div>
    </div>
  );
}
