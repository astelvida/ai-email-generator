import {
  Columns2,
  Columns3,
  Columns4,
  LayoutGrid,
  LayoutTemplateIcon,
  LucideContainer,
  PanelLeftIcon,
  PanelRightIcon,
  RectangleHorizontal,
  Rows2Icon,
} from "lucide-react";

import {
  FrameIcon,
  ImageIcon,
  MousePointerClickIcon,
  PanelTopIcon,
  Share2Icon,
  SquareSplitVerticalIcon,
  TypeIcon,
} from "lucide-react";
import { Instagram, Facebook, Twitter, TikTok } from "@/components/BrandIcons";
import { BlockType as BlockType, LayoutType } from "./types";

export const layouts: LayoutType[] = [
  {
    name: "equal-one",
    type: "layout-one-column-empty",
    icon: RectangleHorizontal,
    label: "Full Width",
    columnsGrid: [12],
  },
  {
    name: "equal-two",
    type: "layout-two-columns-empty",
    icon: Columns2,
    label: "2 Columns",
    columnsGrid: [6, 6],
  },
  {
    name: "equal-three",
    type: "layout-three-columns-empty",
    icon: Columns3,
    label: "3 Columns",
    columnsGrid: [4, 4, 4],
  },
  {
    name: "equal-four",
    type: "layout-four-columns-empty",
    icon: Columns4,
    label: "4 Columns",
    columnsGrid: [3, 3, 3, 3],
  },
  {
    name: "small-large",
    type: "layout-three-columns-9-3-empty",
    icon: PanelLeftIcon,
    label: "3 columns 9-3",
    columnsGrid: [9, 3],
  },
  {
    name: "large-small",
    type: "layout-three-columns-3-9-empty",
    icon: PanelRightIcon,
    label: "3 columns 3-9",
    columnsGrid: [3, 9],
  },
  // { id: "small-medium-small", type: "layout-three-columns-3-6-3-empty", icon: LayoutTemplateIcon, label: "3 columns 3-6-3", columns: [3, 6, 3] },
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

// const layouts: LayoutOption[] = [
//   { id: "full", name: "Full Width", columns: [12] },
//   { id: "small-large", name: "Small + Large", columns: [3, 9] },
//   { id: "medium-large", name: "Medium + Large", columns: [4, 8] },
//   { id: "equal-two", name: "Equal Two Columns", columns: [6, 6] },
//   { id: "large-small", name: "Large + Small", columns: [8, 4] },
//   { id: "large-tiny", name: "Large + Tiny", columns: [9, 3] },
//   { id: "equal-three", name: "Equal Three Columns", columns: [4, 4, 4] },
//   { id: "squares-large", name: "Squares + Large", columns: [3, 3, 6] },
//   { id: "small-medium-small", name: "Small + Medium + Small", columns: [3, 6, 3] },
// ];

export const blocks: BlockType[] = [
  {
    type: "button",
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
