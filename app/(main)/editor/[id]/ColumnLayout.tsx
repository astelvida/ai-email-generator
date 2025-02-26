"use client";

import { Droppable } from "@/components/Droppable";
import { ElementConfig } from "@/lib/types";
import ButtonComponent from "../../../../components/elements/ButtonComponent";
import TextComponent from "../../../../components/elements/TextComponent";
import ImageComponent from "../../../../components/elements/ImageComponent";
import DividerComponent from "../../../../components/elements/DividerComponent";

const getElementComponent = (element: ElementConfig) => {
  switch (element?.type) {
    case "button":
      return <ButtonComponent {...element} />;
    case "text":
      return <TextComponent {...element} />;
    case "image":
      return <ImageComponent {...element} />;
    case "divider":
      return <DividerComponent {...element} />;
    default:
      return null;
  }
};

export function ColumnLayout({ layout, position }: { layout: ElementConfig; position: number }) {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout.children?.length}, 1fr)`,
          gap: "6px",
        }}
      >
        {layout.children?.map((layoutChild, index) => (
          <div
            key={layoutChild.id}
            className={`flex min-h-[100px] items-center justify-center border-2 border-dashed border-gray-300 bg-blue-100/50 p-2 text-center`}
          >
            <Droppable
              id={`${layoutChild.id}`}
              data={{ ...layoutChild, columnIndex: index, rowIndex: position }}
            >
              <div>{getElementComponent(layoutChild) || "Drop content here"}</div>
            </Droppable>
          </div>
        ))}
      </div>
    </div>
  );
}
