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
  type: "button" | "text" | "image" | "divider" | "icons" | "social-icons";
  style?: React.CSSProperties;
  text?: string;
  content?: string;
  url?: string;
  imageUrl?: string;
  alt?: string;
  label?: string;
  icon?: LucideIcon;
  brand?: "facebook" | "instagram" | "tiktok" | "linkedin";
}

export interface ColumnType {
  id: string;
  gridColumn: number;
  type: "column";
  // style?: React.CSSProperties;
  // blocks: BlockType[];
}

// Types for Layout.tsx
export interface LayoutType {
  id: string;
  name: string;
  type: string;
  label: string;
  templateColumns: number[];
  style?: React.CSSProperties;
  icon?: LucideIcon;
  columns: ColumnType[];
}
