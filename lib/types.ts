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

export type BlockIcon = {
  name?: string;
  icon: React.ReactNode;
  url?: string;
};

export interface BlockElement {
  id: string;
  layoutId: string;
  columnId: string;

  label: string;
  type:
    | "heading"
    | "paragraph"
    | "button"
    | "list"
    | "image"
    | "video"
    | "divider"
    | "icons"
    | "social-icons"
    | "html";
  style: React.CSSProperties;
  extraAttributes?: {
    text?: string;
    content?: string[];
    listType?: "ordered" | "unordered";
    linkTo?: "Web page" | "Email" | "Phone" | "Text" | "Social" | "Download" | "None";
    url?: string;
    imageUrl?: string;
    alt?: string;
    icon?: BlockIcon;
    icons?: BlockIcon[];
    brand?: "facebook" | "instagram" | "tiktok" | "linkedin";
    isTransparent?: boolean;
    videoUrl?: string;
    html?: string;
  };
  icon?: React.ReactElement | LucideIcon;
}

export interface ColumnType {
  id: string;
  type: "column";
  gridColumn: number;
  layoutId: string;
  index: number;
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
