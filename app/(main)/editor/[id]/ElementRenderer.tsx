"use client";
import { BlockType } from "@/lib/types";
import ButtonComponent from "../../../../components/elements/ButtonComponent";
import TextComponent from "../../../../components/elements/TextComponent";
import ImageComponent from "../../../../components/elements/ImageComponent";
import DividerComponent from "../../../../components/elements/DividerComponent";
import { useSortable } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export const getElementComponent = (block: BlockType) => {
  switch (block?.type) {
    case "button":
      return <ButtonComponent {...block} />;
    case "text":
      return <TextComponent {...block} />;
    case "image":
      return <ImageComponent {...block} />;
    case "divider":
      return <DividerComponent {...block} />;
    default:
      return null;
  }
};

export function BlockContainer({ block, parentIndex }: { block: BlockType; parentIndex: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: block.id as UniqueIdentifier,
    data: {
      parentIndex: parentIndex,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {getElementComponent(block)}
    </div>
  );
}
