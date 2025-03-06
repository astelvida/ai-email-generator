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
  switch (block?.name) {
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
