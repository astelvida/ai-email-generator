"use client";

import { useEffect, useRef, useState } from "react";
import { useToggleView } from "@/providers/ToggleViewProvider";
import { useEmailTemplate } from "@/providers/EmailTemplateProvider";
import { useDragAndDrop } from "@/providers/DragAndDropProvider";
import { ColumnLayout } from "./ColumnLayout";
import { LayoutWithId } from "@/lib/types/config.types";

export function Canvas() {
  const { view } = useToggleView();
  const [isDragging, setIsDragging] = useState(false);
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementLayout } = useDragAndDrop();
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = () => {
    setIsDragging(false);

    if (dragElementLayout?.dragLayout) {
      setEmailTemplate((prev) => {
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
        {emailTemplate.length ? (
          emailTemplate.map((layout, index) => <div key={index}>{getLayoutComponent(layout)}</div>)
        ) : (
          <div className="flex h-full items-center justify-center">
            <p>Drag a layout here to start</p>
          </div>
        )}
      </div>
    </div>
  );
}
