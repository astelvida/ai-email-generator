"use client";
import { ElementConfig } from "@/lib/types";
import ButtonComponent from "../../../../components/elements/ButtonComponent";
import TextComponent from "../../../../components/elements/TextComponent";
import ImageComponent from "../../../../components/elements/ImageComponent";
import DividerComponent from "../../../../components/elements/DividerComponent";

export const getElementComponent = (element: ElementConfig) => {
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

export function ElementRenderer({ element }: { element: ElementConfig }) {
  return getElementComponent(element);
}
