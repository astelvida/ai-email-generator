"use client";

import { ElementConfig, LayoutWithId } from "@/lib/types/config.types";
import { useDragAndDrop } from "@/providers/DragAndDropProvider";
import { useEmailTemplate } from "@/providers/EmailTemplateProvider";
import { useState } from "react";
import ButtonComponent from "./elements/ButtonComponent";
import TextComponent from "./elements/TextComponent";
import ImageComponent from "./elements/ImageComponent";
import DividerComponent from "./elements/DividerComponent";
import LogoComponent from "./elements/LogoComponent";
import SocialIcons from "./elements/SocialIcons";
import LogoHeader from "./elements/LogoHeader";
import { useSelectedElement } from "@/providers/SelectedElementProvider";

export function ColumnLayout({ layout }: { layout: LayoutWithId }) {
  const [dragOver, setDragOver] = useState<{
    index: number;
    columnId: string;
  } | null>(null);
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementLayout } = useDragAndDrop();
  const { selectedElement, setSelectedElement } = useSelectedElement();

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOver({
      index,
      columnId: layout.id,
    });
  };

  const handleDrop = () => {
    const index = dragOver?.index;
    if (index === undefined) return;
    setEmailTemplate((prevItem) =>
      prevItem.map((col) =>
        col.id === layout?.id ? { ...col, [index]: dragElementLayout?.dragElement } : col,
      ),
    );
    setDragOver(null);
  };

  const getElementComponent = (element: ElementConfig) => {
    switch (element?.type) {
      case "Button":
        return <ButtonComponent {...element} />;
      case "Text":
        return <TextComponent {...element} />;
      case "Image":
        return <ImageComponent {...element} />;
      case "Divider":
        return <DividerComponent {...element} />;
      case "Logo":
        return <LogoComponent {...element} />;
      case "LogoHeader":
        return <LogoHeader {...element} />;
      case "SocialIcons":
        return <SocialIcons {...element} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout.numOfCol}, 1fr)`,
          gap: "0px",
        }}
      >
        {Array.from({ length: layout.numOfCol }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-center border border-dashed border-gray-300 bg-gray-200 p-2 ${
              dragOver?.index === index && dragOver?.columnId === layout.id ? "bg-red-200" : ""
            } ${selectedElement?.layout.id == layout.id && selectedElement.index == index ? "solid border-2 border-green-500" : ""} `}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop()}
            onClick={() => setSelectedElement({ layout: layout, index: index })}
          >
            {getElementComponent(layout?.[index]) || "Drag an element here"}
          </div>
        ))}
      </div>
    </div>
  );
}
