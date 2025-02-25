import React from "react";
import { ElementOuterStyle, ImageElementStyle, SocialIcon } from "@/lib/types/config.types";

interface SocialIconsProps {
  socialIcons: SocialIcon[];
  style: ImageElementStyle;
  outerStyle: ElementOuterStyle;
}
function SocialIcons({ socialIcons, style, outerStyle }: SocialIconsProps) {
  return (
    <div style={outerStyle}>
      {socialIcons.map((item, index) => (
        <a href={item?.url} key={index}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item?.icon} alt="icon" style={style} />
        </a>
      ))}
    </div>
  );
}

export default SocialIcons;
