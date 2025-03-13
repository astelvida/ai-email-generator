"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(color)

  const presetColors = [
    "#000000",
    "#ffffff",
    "#7747FF",
    "#FF4785",
    "#47B0FF",
    "#00C781",
    "#FFCA58",
    "#FF6B6B",
    "#999999",
    "#666666",
    "#333333",
    "#101112",
    "#1e0e4b",
    "#dddddd",
  ]

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor)
    onChange(newColor)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: selectedColor }}
          aria-label="Pick a color"
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium">Color Picker</label>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-8 mt-1 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs font-medium">Preset Colors</label>
            <div className="grid grid-cols-7 gap-1 mt-1">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handleColorChange(presetColor)}
                  aria-label={`Select color ${presetColor}`}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

