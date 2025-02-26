import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { db } from "@/lib/db";
import { templates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { CreateTemplateButton } from "./CreateTemplateButton";
import { TemplateCard } from "./TemplateCard";

// Mock content for templates since it's not implemented yet
const MOCK_CONTENT =
  "This is a sample email template that will help you generate professional and engaging emails using AI. The template includes customizable sections for greetings, main message, and closing remarks.";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const templatesForUser = await db.select().from(templates).where(eq(templates.userId, user?.id));

  const sortedTemplates = templatesForUser
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .map((template) => ({
      ...template,
      content: MOCK_CONTENT, // Add mock content to each template
    }));

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.username || user?.emailAddresses[0].emailAddress}!
          </h1>
          <CreateTemplateButton />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">Your Email Templates</h2>

          {sortedTemplates.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-8 py-12">
              <Image
                src="/envelope.svg"
                alt="No templates"
                width={200}
                height={200}
                className="opacity-75"
              />
              <div className="space-y-3 text-center">
                <h3 className="text-lg font-semibold">No templates yet</h3>
                <p className="max-w-sm text-muted-foreground">
                  Create your first email template to get started with AI-powered email generation.
                </p>
                <CreateTemplateButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
