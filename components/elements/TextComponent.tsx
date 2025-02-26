import React from "react";
import { ElementStyle, ElementOuterStyle } from "@/lib/types/config.types";

interface TextComponentProps {
  style: ElementStyle;
  outerStyle?: ElementOuterStyle;
  text?: string;
}

function TextComponent({ style, text = "" }: TextComponentProps) {
  return (
    <div style={style}>
      <h2>{text}</h2>
    </div>
  );
}

export default TextComponent;
