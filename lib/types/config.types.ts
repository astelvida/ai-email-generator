import { LucideIcon } from "lucide-react";

// Types for ElementList.tsx
export interface ElementStyle {
  backgroundColor?: string;
  color?: string;
  padding?: string;
  width?: string | number;
  height?: string | number;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  borderRadius?: string;
  fontWeight?: string | number;
  margin?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

export interface ImageElementStyle extends ElementStyle {
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export interface ElementOuterStyle {
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

export interface SocialIconStyle extends ElementStyle {
  socialIcons: SocialIcon[];
  options: SocialIcon[];
}

export interface ElementConfig {
  id?: string;
  icon: LucideIcon;
  type: "Button" | "Text" | "Image" | "Logo" | "LogoHeader" | "Divider" | "SocialIcons";
  label: string;
  content?: string;
  url?: string;
  textarea?: string;
  imageUrl?: string;
  alt?: string;
  style: ElementStyle | ImageElementStyle;
  outerStyle?: ElementOuterStyle;
}

// Types for Layout.tsx
export interface LayoutConfig {
  id?: string;
  label: string;
  type: "column";
  numOfCol: 1 | 2 | 3 | 4;
  icon: LucideIcon;
}

export interface LayoutWithId extends LayoutConfig {
  id: string;
}

export interface ElementWithId extends ElementConfig {
  id: string;
}
