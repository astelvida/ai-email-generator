import React from "react";
import { ElementStyle, ElementOuterStyle } from "@/lib/types/config.types";

interface TextComponentProps {
  style: ElementStyle;
  outerStyle?: ElementOuterStyle;
  content?: string;
}

function TextComponent({ style, outerStyle = {}, content = "" }: TextComponentProps) {
  return (
    <div style={outerStyle}>
      <h2 style={style}>{content}</h2>
    </div>
  );
}

export default TextComponent;
