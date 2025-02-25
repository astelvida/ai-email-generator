"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MonitorIcon, SaveIcon, SmartphoneIcon, TabletIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { deleteTemplate, updateTemplate } from "@/app/(main)/actions";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useViewStore } from "@/lib/stores/view";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function EditorHeader() {
  const { view, setView } = useViewStore();
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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Title..." value={title} onChange={handleTitleChange} />
      </div>

      <Tabs value={view} onValueChange={(v) => setView(v as "desktop" | "mobile")}>
        <TabsList>
          <TabsTrigger value="desktop">
            <MonitorIcon className="mr-2 h-4 w-4" />
            Desktop
          </TabsTrigger>
          <TabsTrigger value="mobile">
            <SmartphoneIcon className="mr-2 h-4 w-4" />
            Mobile
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2">
        <Button onClick={handleSave}>
          <SaveIcon className="h-4 w-4" />
          Save
        </Button>

        <Button onClick={handleDelete}>
          <TrashIcon className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
