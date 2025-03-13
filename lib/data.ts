"use client";

import { FacebookLogo, InstagramLogo, TikTokLogo } from "@/components/SocialIcons";
import {
  type LucideIcon,
  HeadingIcon,
  ImageIcon,
  ListIcon,
  MousePointerClickIcon,
  Share2Icon,
  SquareSplitVerticalIcon,
  TypeIcon,
} from "lucide-react";
import { BlockElement } from "./types";

export interface LayoutOptionWithIcons {
  name: string;
  type: string;
  templateColumns: number[];
  label: string;
  icon: LucideIcon;
  extraAttributes?: Record<string, unknown>;
  style?: React.CSSProperties;
}

// Block options for the sidebar

export type BlockOption = Omit<BlockElement, "id" | "layoutId" | "columnId">;

export const BLOCK_OPTIONS: BlockOption[] = [
  {
    type: "title",
    label: "Title",
    icon: HeadingIcon,
    extraAttributes: {
      text: "Write something here",
    },
    style: {
      backgroundColor: "#fff",
      color: "#000000",
      textAlign: "center",
      verticalAlign: "middle",
      fontFamily: "Arial",
      fontSize: "22px",
      fontWeight: "normal", // normal, bold, italic, underline, strikethrough
      textTransform: "uppercase", //lowercase , capitilized
      letterSpacing: "0px",
      lineHeight: "1.2",
      fontStyle: "normal", // normal, italic, oblique
      textDecoration: "none", // underline, strikethrough
      textShadow: "none", // none, 1px 1px 1px #000000, 2px 2px 2px #000000, 3px 3px 3px #000000
      padding: "10px",
    },
  },
  {
    type: "paragraph",
    label: "Text",
    icon: TypeIcon,
    extraAttributes: {
      text: "Write something here",
    },
    style: {
      backgroundColor: "#fff",
      color: "#000000",
      padding: "10px",
      textAlign: "center",
      fontSize: "22px",
      fontWeight: "normal",
      textTransform: "uppercase", //lowercase , capitilized
    },
  },
  {
    type: "button",
    label: "Button",
    icon: MousePointerClickIcon,
    extraAttributes: {
      text: "Sample Button",
      linkTo: "Web page", // Web page, Email, Phone, Text, Social, Download, None
      url: "#",
    },
    style: {
      textAlign: "center",
      backgroundColor: "#007bff",
      color: "#ffffff",
      padding: "10px",
      width: "auto",
      fontSize: "16px",
      borderRadius: "0px",
      fontWeight: "normal",
    },
  },
  {
    type: "image",
    label: "Image",
    icon: ImageIcon,
    extraAttributes: {
      imageUrl: "/default-image.png",
      alt: "an image",
      url: "#",
    },
    style: {
      backgroundColor: "#ffffff",
      height: "50%", // 100%, 75%, 50%, 25%
      width: "70%",
      margin: "0px",
      borderRadius: "0px",
      objectFit: "cover",
      padding: "10px",
    },
  },
  {
    type: "divider",
    label: "Divider",
    icon: SquareSplitVerticalIcon,
    style: {
      color: "#000000",
      padding: "10px",
      width: "100%",
      borderWidth: "0px",
      borderStyle: "solid",
      borderColor: "#000000",
      borderRadius: "0px",
    },
    extraAttributes: {
      isTransparent: false, // Turns into a SPACER
    },
  },
  {
    type: "list",
    label: "List",
    icon: ListIcon,
    extraAttributes: {
      listType: "unordered", // ordered, unordered
      content: [
        {
          id: "1",
          text: "Write something here...",
        },
        {
          id: "2",
          text: "Write something here...",
        },
        {
          id: "3",
          text: "Write something here",
        },
      ],
    },
    style: {
      backgroundColor: "#fff",
      color: "#000000",
      padding: "10px",
      textAlign: "center",
      fontSize: "22px",
      fontWeight: "normal",
      textTransform: "uppercase", //lowercase , capitilized
    },
  },
  {
    type: "icons", // TODO: change to social icons
    label: "Social Icons",
    icon: Share2Icon,
    style: {
      width: 40,
      height: 40,
    },
    extraAttributes: {
      icons: [
        {
          icon: InstagramLogo, // TODO: change to social icon
          url: "https://www.instagram.com",
        },
        {
          icon: FacebookLogo,
          url: "https://www.facebook.com",
        },
        {
          icon: TikTokLogo, // TODO: change to tiktok icon
          url: "https://www.tiktok.com",
        },
      ],
    },
  },
];

// Layout options for the sidebar
export const _layoutOptions = [
  { type: "full", label: "Full Width", columns: [12] },
  { type: "small-large", label: "Small + Large", columns: [3, 9] },
  { type: "medium-large", label: "Medium + Large", columns: [4, 8] },
  { type: "equal-two", label: "Equal Two Columns", columns: [6, 6] },
  { type: "large-small", label: "Large + Small", columns: [8, 4] },
  { type: "large-tiny", label: "Large + Tiny", columns: [9, 3] },
  { type: "equal-three", label: "Equal Three Columns", columns: [4, 4, 4] },
  { type: "squares-large", label: "Squares + Large", columns: [3, 3, 6] },
  { type: "small-medium-small", label: "Small + Medium + Small", columns: [3, 6, 3] },
];

export interface LayoutOption {
  type: string;
  label: string;
  columns: number[];
  colWidths: string[];
  gridStyle: React.CSSProperties;
  style?: React.CSSProperties;
}

export const LAYOUT_OPTIONS: LayoutOption[] = _layoutOptions.map((layout) => {
  const colWidths = layout.columns.map((width) => `${Math.floor((width / 12) * 100 * 100) / 100}%`);
  return {
    ...layout,
    colWidths,
    gridStyle: {
      display: "grid",
      gap: "2px",
      gridTemplateColumns: colWidths.join(" "),
    },
  };
});

export const defaultLayoutStyle = {
  "background-color": "transparent",
  color: "#000000",
  width: "500px",
  "background-image": "none",
  "background-repeat": "no-repeat",
  "background-position": "top left",
  // "border": "0px solid transparent",
  "border-width": "0px", // 0px, 1px, 2px, 3px, 4px, 5px  thick, thin, medium
  "border-style": "solid", // solid, dashed, dotted, double, groove, ridge, inset, outset
  "border-color": "transparent", // transparent, #000000, #ffffff
  "border-radius": "0px", // rounded-none, rounded-sm, rounded-md, rounded-lg, rounded-full
  padding: "0px 0px 0px 0px",
};

export const BLOCK_OPTIONS_SHOWCASE = [
  { icon: "T≡", label: "TITLE" },
  { icon: "≡¶", label: "PARAGRAPH" },
  { icon: "≡", label: "LIST" },
  { icon: "▣", label: "IMAGE" },
  { icon: "⬚", label: "BUTTON" },
  { icon: "◫", label: "TABLE" },
  { icon: "═", label: "DIVIDER" },
  { icon: "↕", label: "SPACER" },
  { icon: "+", label: "SOCIAL" },
  { icon: "</>", label: "HTML" },
  { icon: "▶", label: "VIDEO" },
  { icon: " ", label: "ICONS" },
];
// Default content for block types
export const getDefaultContentForBlockType = (blockType: string) => {
  switch (blockType) {
    case "TITLE":
      return "New Title";
    case "PARAGRAPH":
      return "New Paragraph";
    case "LIST":
      return ["New List Item", "Second List Item", "Third List Item"];
    case "SOCIAL":
      return [];
    case "IMAGE":
      return "";
    case "VIDEO":
      return "";
    case "GIF":
      return "";
    case "HTML":
      return "<div>New HTML Block</div>";
    case "BUTTON":
      return "Click Me";
    case "TABLE":
      return [
        ["Header 1", "Header 2", "Header 3"],
        ["Cell 1", "Cell 2", "Cell 3"],
        ["Cell 4", "Cell 5", "Cell 6"],
      ];
    case "DIVIDER":
      return "";
    case "SPACER":
      return 20; // height in pixels
    case "ICONS":
      return ["star", "heart", "thumbs-up"];
    default:
      return "";
  }
};
