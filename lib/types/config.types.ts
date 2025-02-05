import { LucideIcon } from "lucide-react";

// Types for ElementList.tsx
export interface Style {
  backgroundColor?: string;
  color?: string;
  padding?: string;
  width?: string | number;
  height?: string | number;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  borderRadius?: string;
  fontWeight?: string | number;
  objectFit?: string;
  margin?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

export interface OuterStyle {
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  backgroundColor?: string;
  gap?: number;
}

export interface SocialIcon {
  icon: string;
  url: string;
}

export interface ElementConfig {
  icon: LucideIcon;
  type:
    | "Button"
    | "Text"
    | "Image"
    | "Logo"
    | "LogoHeader"
    | "Divider"
    | "SocialIcons";
  label: string;
  content?: string;
  url?: string;
  textarea?: string;
  imageUrl?: string;
  alt?: string;
  style: Style;
  outerStyle?: OuterStyle;
  socialIcons?: SocialIcon[];
  options?: SocialIcon[];
}

// Types for Layout.tsx
export interface LayoutConfig {
  label: string;
  type: "column";
  numOfCol: 1 | 2 | 3 | 4;
  icon: LucideIcon;
}
