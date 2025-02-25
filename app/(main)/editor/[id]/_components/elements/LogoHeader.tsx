import React from "react";
import { ElementOuterStyle, ImageElementStyle } from "@/lib/types/config.types";

interface LogoHeaderProps {
  style: ImageElementStyle;
  imageUrl?: string;
  outerStyle?: ElementOuterStyle;
}

function LogoHeader({ style, imageUrl = "/default-image.png", outerStyle = {} }: LogoHeaderProps) {
  return (
    <div style={outerStyle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="logo" style={style} />
    </div>
  );
}

export default LogoHeader;
