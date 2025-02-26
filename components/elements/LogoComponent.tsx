import React from "react";
import { ImageElementStyle, ElementOuterStyle } from "@/lib/types/config.types";

interface LogoComponentProps {
  style: ImageElementStyle;
  imageUrl?: string;
  outerStyle?: ElementOuterStyle;
}

function LogoComponent({ style, imageUrl, outerStyle = {} }: LogoComponentProps) {
  return (
    <div style={outerStyle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="logo" style={style} />
    </div>
  );
}

export default LogoComponent;
