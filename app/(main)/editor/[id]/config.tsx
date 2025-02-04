import {
  ColumnsIcon,
  Columns2Icon,
  Columns3Icon,
  Columns4Icon,
  TypeIcon,
  ImageIcon,
  MousePointerClickIcon,
  type LucideIcon,
} from "lucide-react";

export const DEFAULT_GAP = 0;
interface LayoutConfigItem {
  id: string;
  label: string;
  columns: number;
  rows: number;
  gap?: number;
  myIcon: LucideIcon;
}

export const LayoutConfig: {
  heading: string;
  items: Record<string, LayoutConfigItem>;
} = {
  heading: "Layouts",
  items: {
    "1-column": {
      id: "1-column",
      label: "1 Column",
      columns: 1,
      rows: 1,
      gap: DEFAULT_GAP,
      myIcon: ColumnsIcon,
    },
    "2-column": {
      id: "2-column",
      label: "2 Columns",
      columns: 2,
      rows: 1,
      gap: DEFAULT_GAP,
      myIcon: Columns2Icon,
    },
    "3-column": {
      id: "3-column",
      label: "3 Columns",
      columns: 3,
      rows: 1,
      gap: DEFAULT_GAP,
      myIcon: Columns3Icon,
    },
    "4-column": {
      id: "4-column",
      label: "4 Columns",
      columns: 4,
      rows: 1,
      gap: DEFAULT_GAP,
      myIcon: Columns4Icon,
    },
  },
};

export const ElementsConfig = {
  heading: "Elements",
  items: {
    text: {
      id: "text",
      label: "Text",
      myIcon: TypeIcon,
    },
    image: {
      id: "image",
      label: "Image",
      myIcon: ImageIcon,
    },
    button: {
      id: "button",
      label: "Button",
      myIcon: MousePointerClickIcon,
    },
  },
};
