import { Columns2, Columns3, Columns4, LayoutGrid, RectangleHorizontal } from "lucide-react";

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
import { ElementConfig } from "./types";

export const layouts = [
  { type: "layout-1", icon: RectangleHorizontal, label: "1 Column", columns: 1 },
  { type: "layout-2", icon: Columns2, label: "2 Columns", columns: 2 },
  { type: "layout-3", icon: Columns3, label: "3 Columns", columns: 3 },
  { type: "layout-4", icon: Columns4, label: "4 Columns", columns: 4 },
];

const blocks: ElementConfig[] = [
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
