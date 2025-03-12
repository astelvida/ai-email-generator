"use client";
import ButtonComponent from "@/components/elements/ButtonComponent";
import DividerComponent from "@/components/elements/DividerComponent";
import ImageComponent from "@/components/elements/ImageComponent";
import TextComponent from "@/components/elements/TextComponent";
import { BlockType } from "@/lib/types";

export const getElementComponent = (block: BlockType) => {
  const type = block.type.startsWith("block") ? block?.type.split("-")[1] : block?.type;
  switch (type) {
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
