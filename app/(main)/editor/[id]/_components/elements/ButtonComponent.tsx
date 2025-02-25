import React from "react";
import { ElementStyle, ElementOuterStyle } from "@/lib/types/config.types";

interface ButtonComponentProps {
  style: ElementStyle;
  content?: string;
  url?: string;
  outerStyle?: ElementOuterStyle;
}

function ButtonComponent({ style, content, url, outerStyle }: ButtonComponentProps) {
  return (
    <a href={url} style={outerStyle}>
      <button style={style}>{content}</button>
    </a>
  );
}

export default ButtonComponent;
