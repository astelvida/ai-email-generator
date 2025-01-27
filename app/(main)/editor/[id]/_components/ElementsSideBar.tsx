"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Columns,
  Columns2,
  Columns3,
  Columns4,
  Type,
  Image as ImageIcon,
  Share2,
  Divide,
  CatIcon,
} from "lucide-react";

const elements = [
  {
    heading: "Layouts",
    items: [
      { icon: <Columns className="h-4 w-4" />, label: "1 Column" },
      { icon: <Columns2 className="h-4 w-4" />, label: "2 Column" },
      { icon: <Columns3 className="h-4 w-4" />, label: "3 Column" },
      { icon: <Columns4 className="h-4 w-4" />, label: "4 Column" },
    ],
  },
  {
    heading: "Elements",
    items: [
      { icon: <Type className="h-4 w-4" />, label: "Text" },
      { icon: <ImageIcon className="h-4 w-4" />, label: "Image" },
      { icon: <CatIcon className="h-4 w-4" />, label: "Logo" },
      { icon: <Share2 className="h-4 w-4" />, label: "Social Icons" },
      { icon: <Divide className="h-4 w-4" />, label: "Divider" },
    ],
  },
];

export function ElementsSidebar() {
  return (
    <div className="space-y-6">
      {elements.map((section, index) => (
        <div key={index} className="space-y-4">
          <h2 className="text-sm font-semibold">{section.heading}</h2>
          <div className="grid grid-cols-2 gap-2">
            {section.items.map((item, itemIndex) => (
              <Button
                key={itemIndex}
                variant="outline"
                className="h-20 flex flex-col gap-2 justify-center"
                draggable
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
          {index < elements.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
