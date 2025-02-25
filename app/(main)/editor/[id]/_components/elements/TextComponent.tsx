import React from "react";
import { ElementStyle, ElementOuterStyle } from "@/lib/types/config.types";

interface TextComponentProps {
  style: ElementStyle;
  outerStyle?: ElementOuterStyle;
  textarea?: string;
}

function TextComponent({ style, outerStyle = {}, textarea = "" }: TextComponentProps) {
  return (
    <div style={outerStyle}>
      <h2 style={style}>{textarea}</h2>
    </div>
  );
}

export default TextComponent;
