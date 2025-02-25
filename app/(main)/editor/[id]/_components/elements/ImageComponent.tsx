import React from "react";
import { ImageElementStyle, ElementOuterStyle } from "@/lib/types/config.types";

interface ImageComponentProps {
  style: ImageElementStyle;
  imageUrl?: string;
  outerStyle?: ElementOuterStyle;
}
function ImageComponent({ style, imageUrl = "", outerStyle = {} }: ImageComponentProps) {
  return (
    <div style={outerStyle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl || "/default-image.png"} alt="image" style={style} />
    </div>
  );
}

export default ImageComponent;
