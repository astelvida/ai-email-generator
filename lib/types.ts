import { LucideIcon } from "lucide-react";

export interface BuilderElement {
  id?: string;
  type: "button" | "text" | "image" | "divider" | "layout-1" | "layout-2" | "layout-3" | "layout-4";
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  cornerRadius?: number;
  children?: BuilderElement[];
  // Properties for Text
  text?: string;
  fontSize?: number;
  textAlign?: "left" | "center" | "right" | "justify";
  fontFamily?: string;
  fontWeight?: "normal" | "bold";
  color?: string;
  // Properties for Image
  src?: string;
  altText?: string;
  width?: number;
  align?: "left" | "center" | "right";
  // Properties for Button
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

// Types for ElementList.tsx
export interface ElementStyle {
  backgroundColor?: string;
  color?: string;

  width?: string | number;
  height?: string | number;

  borderRadius?: "rounded-none" | "rounded-md" | "rounded-full";

  fontSize?: string | number;
  textAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "middle" | "bottom";
  fontWeight?: "light" | "normal" | "bold";
  textTransform?: "uppercase" | "lowercase" | "capitalize";
  padding?: string; // padding-top, padding-right, padding-bottom, padding-left
}

export interface ImageElementStyle extends ElementStyle {
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  imageUrl?: string;
  alt?: string;
  padding?: string;
}

export interface BlockType {
  id?: string;
  name?: string;
  elementType?: "block";
  type: "button" | "text" | "image" | "divider";
  style?: React.CSSProperties;
  text?: string;
  url?: string;
  imageUrl?: string;
  alt?: string;
  label: string;
  icon: LucideIcon;
}

export interface ContentBlockType {
  id: string | number;
  gridColumn: number;
  type: "column" | "container";
  elementType: "column";
  style?: React.CSSProperties;
  blocks: BlockType[];
}

// Types for Layout.tsx
export interface LayoutType {
  name: string;
  type: string;
  label: string;
  templateColumns: number[];
  style: React.CSSProperties;
  icon: LucideIcon;
  columns: ContentBlockType[];
}
