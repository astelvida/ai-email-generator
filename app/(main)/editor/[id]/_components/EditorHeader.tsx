import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MonitorIcon, SmartphoneIcon } from "lucide-react";
import React from "react";

export function EditorHeader() {
  return (
    <div className="flex justify-between items-center">
      <ToggleGroup type="single" defaultValue="desktop">
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
