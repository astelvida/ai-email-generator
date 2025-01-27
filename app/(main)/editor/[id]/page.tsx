import React from "react";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { templates } from "@/lib/db/schema";
import { notFound } from "next/navigation";
import { EditorHeader } from "./_components/EditorHeader";
import { ElementsSidebar } from "./_components/ElementsSidebar";
import { Canvas } from "./_components/Canvas";
import { Settings } from "./_components/Settings";

interface EditorPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditorPage(props: EditorPageProps) {
  const params = await props.params;

  const template = await db.query.templates.findFirst({
    where: eq(templates.id, params.id!),
  });

  if (!template) {
    notFound();
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top Header with Desktop/Mobile Toggle */}
      <div className="border-b p-4">
        <EditorHeader />
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Elements */}
        <div className="w-64 border-r bg-background p-4">
          <ElementsSidebar />
        </div>

        {/* Main Canvas */}
        <div className="flex-1 bg-muted p-8">
          <Canvas template={template} />
        </div>

        {/* Right Sidebar - Settings */}
        <div className="w-80 border-l bg-background p-4">
          <Settings />
        </div>
      </div>
    </div>
  );
}
