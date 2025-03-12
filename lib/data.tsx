import {
  AlignHorizontalSpaceAround,
  Columns2,
  Columns3,
  Columns4,
  LucideIcon,
  PanelLeftIcon,
  PanelRightIcon,
  PanelsLeftBottomIcon,
  PanelsRightBottomIcon,
  RectangleHorizontal,
  Share2Icon,
  SquareSplitHorizontalIcon,
} from "lucide-react";

import { FacebookLogo, InstagramLogo, TikTokLogo } from "@/components/BrandIcons";
import { ImageIcon, MousePointerClickIcon, SquareSplitVerticalIcon, TypeIcon } from "lucide-react";
import { BlockType } from "./types";

interface LayoutElement {
  name: string;
  type: string;
  templateColumns: number[];
  style?: React.CSSProperties;
}

export interface LayoutOption extends LayoutElement {
  label: string;
  icon: LucideIcon;
}

export const layoutOptions: LayoutOption[] = [
  {
    name: "container",
    type: "layout-one-column-empty",
    templateColumns: [12],
    label: "Container",
    icon: RectangleHorizontal,
  },
  {
    type: "layout-two-columns-empty",
    templateColumns: [6, 6],
    name: "equal-two",
    label: "2 Columns",
    icon: Columns2,
  },
  {
    name: "equal-three",
    type: "layout-three-columns-empty",
    templateColumns: [4, 4, 4],
    label: "3 Columns",
    icon: Columns3,
  },
  {
    name: "equal-four",
    type: "layout-four-columns-empty",
    templateColumns: [3, 3, 3, 3],
    label: "4 Columns",
    icon: Columns4,
  },
  {
    name: "large-small",
    type: "layout-two-columns-9-3-empty",
    templateColumns: [9, 3],
    label: "quarter end",
    icon: PanelRightIcon,
  },
  {
    name: "small-large",
    type: "layout-two-columns-3-9-empty",
    templateColumns: [3, 9],
    label: "quarter start",
    icon: PanelLeftIcon,
  },
  {
    name: "small-small-medium",
    type: "layout-three-columns-3-3-6-empty",
    templateColumns: [3, 3, 6],
    label: "2 quarter + half",
    icon: PanelsRightBottomIcon,
  },
  {
    name: "medium-small-small",
    type: "layout-three-columns-6-3-3-empty",
    templateColumns: [6, 3, 3],
    label: "half + 2 quarter",
    icon: PanelsLeftBottomIcon,
  },
  {
    name: "small-medium-small",
    type: "layout-three-columns-3-6-3-empty",
    templateColumns: [3, 6, 3],
    label: "quarter + half + quarter",
    icon: SquareSplitHorizontalIcon,
  },
  {
    name: "tiny-large-tiny",
    type: "layout-three-columns-2-8-2-empty",
    templateColumns: [2, 8, 2],
    label: "tiny + large + tiny",
    icon: AlignHorizontalSpaceAround,
  },
];

// {
//   type: "layout-two-columns-8-4-empty",
//   icon: Rows2Icon,å
//   label: "2 columns 8-4",
//   columns: [8, 4],
// },
// {
//   type: "layout-three-columns-6-3-3-empty",
//   icon: Rows3Icon,
//   label: "3 Columns 6-3-3",
//   columns: [6, 3, 3],
// },
// type: "three-columns-6-3-3-empty",

// grid-columns: 6,
// grid-columns: 3,
// grid-columns: 3,

export const blockOptions: BlockType[] = [
  {
    type: "button",
    name: "button",
    label: "Button",
    icon: MousePointerClickIcon,
    text: "Sample Button",
    url: "#",
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
    type: "text",
    name: "paragraph",
    label: "Text",
    icon: TypeIcon,
    text: "Write something here",
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
    type: "image",
    name: "image",
    label: "Image",
    icon: ImageIcon,
    imageUrl: "/default-image.png",
    alt: "an image",
    url: "#",
    style: {
      backgroundColor: "#ffffff",
      padding: "10px",
      height: "50%",
      width: "70%",
      margin: "0px",
      borderRadius: "0px",
    },
  },

  {
    type: "divider",
    name: "divider",
    label: "Divider",
    icon: SquareSplitVerticalIcon,
    style: {
      color: "#000000",
      padding: "10px",
      width: "100%",
    },
  },
  {
    type: "icons", // TODO: change to social icons
    name: "social-icons",
    label: "Social Icons",
    icon: Share2Icon,
    icons: [
      {
        icon: InstagramLogo,
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
    style: {
      width: 40,
      height: 40,
    },
  },
];

// Block options for the sidebar
export const BLOCK_OPTIONS = [
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
  { icon: "★", label: "ICONS" },
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
