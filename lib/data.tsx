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
  SquareSplitHorizontalIcon,
} from "lucide-react";

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

export const layouts: LayoutOption[] = [
  {
    name: "container",
    type: "layout-one-column-empty",
    templateColumns: [12],
    label: "Container",
    icon: RectangleHorizontal,
    elementType: "layout",
  },
  {
    name: "equal-two",
    type: "layout-two-columns-empty",
    templateColumns: [6, 6],
    label: "2 Columns",
    icon: Columns2,
    elementType: "layout",
  },
  {
    name: "equal-three",
    type: "layout-three-columns-empty",
    templateColumns: [4, 4, 4],
    label: "3 Columns",
    icon: Columns3,
    elementType: "layout",
  },
  {
    name: "equal-four",
    type: "layout-four-columns-empty",
    templateColumns: [3, 3, 3, 3],
    label: "4 Columns",
    icon: Columns4,
    elementType: "layout",
  },
  {
    name: "large-small",
    type: "layout-two-columns-9-3-empty",
    templateColumns: [9, 3],
    label: "quarter end",
    icon: PanelRightIcon,
    elementType: "layout",
  },
  {
    name: "small-large",
    type: "layout-two-columns-3-9-empty",
    templateColumns: [3, 9],
    label: "quarter start",
    icon: PanelLeftIcon,
    elementType: "layout",
  },
  {
    name: "small-small-medium",
    type: "layout-three-columns-3-3-6-empty",
    templateColumns: [3, 3, 6],
    label: "2 quarter + half",
    icon: PanelsRightBottomIcon,
    elementType: "layout",
  },
  {
    name: "medium-small-small",
    type: "layout-three-columns-6-3-3-empty",
    templateColumns: [6, 3, 3],
    label: "half + 2 quarter",
    icon: PanelsLeftBottomIcon,
    elementType: "layout",
  },
  {
    name: "small-medium-small",
    type: "layout-three-columns-3-6-3-empty",
    templateColumns: [3, 6, 3],
    label: "quarter + half + quarter",
    icon: SquareSplitHorizontalIcon,
    elementType: "layout",
  },
  {
    name: "tiny-large-tiny",
    type: "layout-three-columns-2-8-2-empty",
    templateColumns: [2, 8, 2],
    label: "tiny + large + tiny",
    icon: AlignHorizontalSpaceAround,
    elementType: "layout",
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

export const blocks: BlockType[] = [
  {
    name: "button",
    type: "block-button",
    elementType: "block",
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
    name: "text",
    type: "block-text",
    elementType: "block",
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
    name: "image",
    type: "block-image",
    elementType: "block",
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
    name: "divider",
    type: "block-divider",
    elementType: "block",
    label: "Divider",
    icon: SquareSplitVerticalIcon,
    style: {
      color: "#000000",
      padding: "10px",
      width: "100%",
    },
  },
];

// {
//   type: "social-icons",
//   label: "Social Icons",
//   icon: Share2Icon,
//   icons: [
//     {
//       icon: Instagram,
//       url: "https://www.instagram.com",
//     },
//     {
//       icon: Facebook,
//       url: "https://www.facebook.com",
//     },
//     {
//       icon: TikTok,
//       url: "https://www.tiktok.com",
//     },
//   ],
//   style: {
//     width: 40,
//     height: 40,
//   },
// },
export default blocks;
