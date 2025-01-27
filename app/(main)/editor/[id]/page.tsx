import React from "react";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { EditorHeader } from "./_components/EditorHeader";
import { ElementsSideBar } from "@/app/(main)/editor/[id]/_components/ElementsSideBar";
import { Canvas } from "@/app/(main)/editor/[id]/_components/Canvas";
import { Settings } from "@/app/(main)/editor/[id]/_components/Settings";
import { templates } from "@/lib/db/schema";
import { notFound } from "next/navigation";

interface EditorPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditorPage(props: EditorPageProps) {
  const params = await props.params;

  const template = await db.select().from(templates).where(eq(templates.id, params.id));

  if (!template) {
    notFound();
  }

  console.log(template);

  return (
    <div className="flex flex-col gap-10 px-10 md:px-20 lg:px-56 mt-10">
      <EditorHeader />

      <div className="flex gap-10">
        <ElementsSideBar />
        <Canvas />
        <Settings />
      </div>
    </div>
  );
}
