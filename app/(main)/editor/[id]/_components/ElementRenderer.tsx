"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface ElementRendererProps {
  element: {
    type: string;
    content: string;
  };
}

export function ElementRenderer({ element }: ElementRendererProps) {
  switch (element.type) {
    case "text":
      return (
        <div className="w-full">
          <Input type="text" placeholder="Enter text" defaultValue={element.content} />
        </div>
      );

    case "button":
      return <Button className="w-full">{element.content || "Button"}</Button>;

    case "image":
      return (
        <div className="relative w-full h-[200px]">
          {element.content ? (
            <Image
              src={element.content}
              alt="Uploaded image"
              fill
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              Drop image here
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}
