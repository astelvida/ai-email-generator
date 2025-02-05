import { Columns2, Columns3, Columns4, RectangleHorizontal } from "lucide-react";
import { LayoutConfig } from "../types/config.types";

const layoutConfig: LayoutConfig[] = [
  {
    label: "Column",
    type: "column",
    numOfCol: 1,
    icon: RectangleHorizontal,
  },
  {
    label: "2 Column",
    type: "column",
    numOfCol: 2,
    icon: Columns2,
  },
  {
    label: "3 Column",
    type: "column",
    numOfCol: 3,
    icon: Columns3,
  },
  {
    label: "4 Column",
    type: "column",
    numOfCol: 4,
    icon: Columns4,
  },
];

export default layoutConfig;
