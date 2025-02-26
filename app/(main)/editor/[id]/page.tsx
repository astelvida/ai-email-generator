import React from "react";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { templates } from "@/lib/db/schema";
import { notFound } from "next/navigation";
import { EmailBuilder } from "./EmailBuilder";
import { EmailBuilderProvider } from "@/providers/email-builder-context";
import { TopBar } from "./TopBar";

interface EmailBuilderPageProps {
  params: Promise<{ id: string }>;
}

export default async function EmailBuilderPage(props: EmailBuilderPageProps) {
  const params = await props.params;

  const template = await db.query.templates.findFirst({
    where: eq(templates.id, params.id!),
  });

  if (!template) {
    notFound();
  }

  return (
    <EmailBuilderProvider>
      <div className="flex h-screen flex-col">
        <div className="h-screen bg-background">
          <TopBar />
          <EmailBuilder />
        </div>
      </div>
    </EmailBuilderProvider>
  );
}
