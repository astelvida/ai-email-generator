import React from "react";
import { ElementStyle, ElementOuterStyle } from "@/lib/types/config.types";

interface ButtonComponentProps {
  style: ElementStyle;
  text?: string;
  url?: string;
}

function ButtonComponent({ style, text, url }: ButtonComponentProps) {
  return (
    <a href={url} style={style}>
      {text}
    </a>
  );
}

export default ButtonComponent;
