"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useSelectedElement } from "@/providers/SelectedElementProvider";

export function Settings() {
  const { selectedElement, setSelectedElement } = useSelectedElement();

  console.log("selectedElement", selectedElement);

  if (!selectedElement || !selectedElement?.layout?.[selectedElement?.index]) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Settings</h2>
        </div>
      </div>
    );
  }

  if (selectedElement?.layout?.[selectedElement?.index]?.type === "Text") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Settings</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Text</Label>
              <Textarea
                value={selectedElement?.layout[selectedElement?.index].content}
                onChange={(e) => {
                  const updatedElement = {
                    ...selectedElement,
                    layout: {
                      ...selectedElement?.layout,
                      [selectedElement?.index]: {
                        ...selectedElement?.layout[selectedElement?.index],
                        content: e.target.value,
                      },
                    },
                  };
                  setSelectedElement(updatedElement);
                }}
                className="min-h-[50px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Text Align</Label>
              <ToggleGroup type="single" defaultValue="left">
                <ToggleGroupItem value="left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <Label>Font Size</Label>
              <div className="flex gap-2">
                <Input type="number" defaultValue={12} />
                <Select defaultValue="px">
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="px">px</SelectItem>
                    <SelectItem value="rem">rem</SelectItem>
                    <SelectItem value="em">em</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
