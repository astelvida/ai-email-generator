import React from "react";
import { ImageElementStyle, ElementOuterStyle } from "@/lib/types/config.types";

interface ImageComponentProps {
  style: ImageElementStyle;
  src?: string;
  alt?: string;
}
function ImageComponent({ style, src = "", alt = "" }: ImageComponentProps) {
  return (
    <div style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src || "/default-image.png"} alt={alt} style={style} />
    </div>
  );
}

export default ImageComponent;
