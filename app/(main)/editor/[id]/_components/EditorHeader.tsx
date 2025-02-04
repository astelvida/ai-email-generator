"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  MonitorIcon,
  SaveIcon,
  SmartphoneIcon,
  TabletIcon,
  TrashIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useToggleView } from "@/components/contexts/ToggleViewContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { deleteTemplate, updateTemplate } from "@/app/actions";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";

export function EditorHeader() {
  const { view, setView } = useToggleView();
  const { id } = useParams();

  const [title, setTitle] = useState("Untitled");

  const handleSave = async () => {
    if (!title.trim()) return;
    await updateTemplate(id as string, { title: title.trim() });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDelete = async () => {
    if (!id) return;
    await deleteTemplate(id as string);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Button onClick={handleSave}>
          <SaveIcon className="w-4 h-4" />
          Save
        </Button>

        <Button onClick={handleDelete}>
          <TrashIcon className="w-4 h-4" />
          Delete
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Title..."
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <ToggleGroup type="single" value={view} onValueChange={setView}>
        <ToggleGroupItem value="mobile" aria-label="Toggle mobile">
          <SmartphoneIcon className="w-4 h-4" />
          Mobile
        </ToggleGroupItem>
        <ToggleGroupItem value="tablet" aria-label="Toggle tablet">
          <TabletIcon className="w-4 h-4" />
          Tablet
        </ToggleGroupItem>
        <ToggleGroupItem value="desktop" aria-label="Toggle desktop">
          <MonitorIcon className="w-4 h-4" />
          Desktop
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
