"use client";

import { deleteTemplate, updateTemplate } from "@/app/(main)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useViewStore } from "@/stores/view";
import {
  ArrowLeftIcon,
  Code2Icon,
  MonitorIcon,
  SaveIcon,
  SmartphoneIcon,
  TrashIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export function TopBar() {
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
    <div className="flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">Draft / New Template</div>
      </div>
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
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            console.log("code");
          }}
        >
          <Code2Icon className="h-4 w-4" />
        </Button>

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
