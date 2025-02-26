"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Trash2, AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold } from "lucide-react";
import { useEmailBuilder } from "@/providers/email-builder-context";

const fontOptions = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
];

export function Settings() {
  const { selectedElement, updateElement } = useEmailBuilder();

  if (!selectedElement) {
    return (
      <div className="w-64 border-l bg-background p-4">
        <p className="text-sm text-muted-foreground">Select an element to edit its properties</p>
      </div>
    );
  }

  // Don't show properties for layout elements
  if (selectedElement.type.startsWith("layout-")) {
    return (
      <div className="w-64 border-l bg-background p-4">
        <p className="text-sm text-muted-foreground">Layout elements cannot be edited</p>
      </div>
    );
  }

  return (
    <div className="w-64 border-l bg-background">
      <div className="flex h-12 items-center justify-between border-b px-4">
        <h2 className="text-sm font-semibold">Properties</h2>
        <Button variant="ghost" size="icon" className="text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="max-h-[calc(100vh-3rem)] space-y-4 overflow-y-auto p-4">
        {selectedElement.type === "text" && (
          <>
            <div className="space-y-2">
              <Label>Text</Label>
              <Input
                value={selectedElement.text || "New Text Element"}
                onChange={(e) => {
                  updateElement({
                    ...selectedElement,
                    text: e.target.value,
                  });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select
                value={selectedElement.fontFamily || "Arial"}
                onValueChange={(value) => {
                  updateElement({
                    ...selectedElement,
                    fontFamily: value,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Font Size</Label>
              <Slider
                value={[selectedElement.fontSize || 16]}
                min={8}
                max={72}
                step={1}
                onValueChange={(value) => {
                  updateElement({
                    ...selectedElement,
                    fontSize: value[0],
                  });
                }}
              />
              <div className="text-xs text-muted-foreground">
                {selectedElement.fontSize || 16}px
              </div>
            </div>
            <div className="space-y-2">
              <Label>Font Weight</Label>
              <ToggleGroup
                type="single"
                value={selectedElement.fontWeight || "normal"}
                onValueChange={(value) => {
                  if (value) {
                    updateElement({
                      ...selectedElement,
                      fontWeight: value as "normal" | "bold",
                    });
                  }
                }}
              >
                <ToggleGroupItem value="normal">Normal</ToggleGroupItem>
                <ToggleGroupItem value="bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <Label>Text Alignment</Label>
              <ToggleGroup
                type="single"
                value={selectedElement.textAlign || "left"}
                onValueChange={(value) => {
                  if (value) {
                    updateElement({
                      ...selectedElement,
                      textAlign: value as "left" | "center" | "right" | "justify",
                    });
                  }
                }}
              >
                <ToggleGroupItem value="left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="justify">
                  <AlignJustify className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <Label>Text Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={selectedElement.color || "#000000"}
                  onChange={(e) => {
                    updateElement({
                      ...selectedElement,
                      color: e.target.value,
                    });
                  }}
                  className="h-10 w-10 border-none p-0"
                />
                <Input
                  type="text"
                  value={selectedElement.color || "#000000"}
                  onChange={(e) => {
                    updateElement({
                      ...selectedElement,
                      color: e.target.value,
                    });
                  }}
                  className="flex-grow"
                />
              </div>
            </div>
          </>
        )}
        {selectedElement.type === "image" && (
          <>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={selectedElement.src || ""}
                onChange={(e) => {
                  updateElement({
                    ...selectedElement,
                    src: e.target.value,
                  });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input
                value={selectedElement.altText || ""}
                onChange={(e) => {
                  updateElement({
                    ...selectedElement,
                    altText: e.target.value,
                  });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Image Width</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[selectedElement.width || 100]}
                  min={10}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    updateElement({
                      ...selectedElement,
                      width: value[0],
                    });
                  }}
                  className="flex-grow"
                />
                <div className="w-12 text-xs text-muted-foreground">
                  {selectedElement.width || 100}%
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Image Alignment</Label>
              <ToggleGroup
                type="single"
                value={selectedElement.align || "center"}
                onValueChange={(value) => {
                  if (value) {
                    updateElement({
                      ...selectedElement,
                      align: value as "left" | "center" | "right",
                    });
                  }
                }}
              >
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
          </>
        )}
        {selectedElement.type === "button" && (
          <>
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={selectedElement.text || "New Button"}
                onChange={(e) => {
                  updateElement({
                    ...selectedElement,
                    text: e.target.value,
                  });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={selectedElement.backgroundColor || "#000000"}
                  onChange={(e) => {
                    updateElement({
                      ...selectedElement,
                      backgroundColor: e.target.value,
                    });
                  }}
                  className="h-10 w-10 border-none p-0"
                />
                <Input
                  type="text"
                  value={selectedElement.backgroundColor || "#000000"}
                  onChange={(e) => {
                    updateElement({
                      ...selectedElement,
                      backgroundColor: e.target.value,
                    });
                  }}
                  className="flex-grow"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Text Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={selectedElement.color || "#ffffff"}
                  onChange={(e) => {
                    updateElement({
                      ...selectedElement,
                      color: e.target.value,
                    });
                  }}
                  className="h-10 w-10 border-none p-0"
                />
                <Input
                  type="text"
                  value={selectedElement.color || "#ffffff"}
                  onChange={(e) => {
                    updateElement({
                      ...selectedElement,
                      color: e.target.value,
                    });
                  }}
                  className="flex-grow"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Button Size</Label>
              <Select
                value={selectedElement.size || "medium"}
                onValueChange={(value) => {
                  updateElement({
                    ...selectedElement,
                    size: value,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Full Width</Label>
              <ToggleGroup
                type="single"
                value={selectedElement.fullWidth ? "yes" : "no"}
                onValueChange={(value) => {
                  updateElement({
                    ...selectedElement,
                    fullWidth: value === "yes",
                  });
                }}
              >
                <ToggleGroupItem value="no">No</ToggleGroupItem>
                <ToggleGroupItem value="yes">Yes</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </>
        )}
        <div className="space-y-2">
          <Label>Padding</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs">Top</Label>
              <Input
                type="number"
                value={selectedElement.padding?.top || 0}
                onChange={(e) => {
                  updateElement({
                    ...selectedElement,
                    padding: {
                      ...selectedElement.padding,
                      top: Number(e.target.value),
                    },
                  });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Right</Label>
              <Input
                type="number"
                value={selectedElement.padding?.right || 0}
                onChange={(e) => {
                  updateElement({
                    ...selectedElement,
                    padding: {
                      ...selectedElement.padding,
                      right: Number(e.target.value),
                    },
                  });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Bottom</Label>
              <Input
                type="number"
                value={selectedElement.padding?.bottom || 0}
                onChange={(e) => {
                  updateElement({
                    ...selectedElement,
                    padding: {
                      ...selectedElement.padding,
                      bottom: Number(e.target.value),
                    },
                  });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Left</Label>
              <Input
                type="number"
                value={selectedElement.padding?.left || 0}
                onChange={(e) => {
                  updateElement({
                    ...selectedElement,
                    padding: {
                      ...selectedElement.padding,
                      left: Number(e.target.value),
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Corner Radius</Label>
          <Slider
            value={[selectedElement.cornerRadius || 0]}
            max={20}
            step={1}
            onValueChange={(value) => {
              updateElement({
                ...selectedElement,
                cornerRadius: value[0],
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
