"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToggleViewContext } from "@/app/use-toogle-view";
import { MonitorIcon, SmartphoneIcon } from "lucide-react";
import React from "react";

export function EditorHeader() {
  const { toggleView } = useToggleViewContext();

  return (
    <div className="flex justify-between items-center">
      <ToggleGroup type="single" defaultValue="desktop" onValueChange={toggleView}>
        <ToggleGroupItem value="mobile" aria-label="Toggle mobile">
          <SmartphoneIcon className="w-4 h-4" />
          Mobile
        </ToggleGroupItem>
        <ToggleGroupItem value="desktop" aria-label="Toggle desktop">
          <MonitorIcon className="w-4 h-4" />
          Desktop
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
