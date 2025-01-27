import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { EditIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { db } from "@/lib/db";
import { templates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { createTemplate } from "@/app/actions";
import { v4 as uuidv4 } from "uuid";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const templatesForUser = await db.select().from(templates).where(eq(templates.userId, user?.id));

  console.log(templatesForUser);

  const sortedTemplates = templatesForUser.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="flex flex-col gap-10 px-10 md:px-20 lg:px-56 mt-10">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">{`Hello, ${
          user?.username || user?.emailAddresses[0].emailAddress
        }!`}</h3>
        <Button>
          <PlusIcon className="w-4 h-4" /> Generate Template
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-primary">Workspace</h3>
        {sortedTemplates.length > 0 ? (
          sortedTemplates.map((template) => (
            <div key={template.id}>
              <h2>{template.title}</h2>
              <p>{template.content}</p>
              <p>{template.createdAt.toLocaleDateString()}</p>
              <Button>
                <EditIcon className="w-4 h-4" />
              </Button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-10">
            <Image src="/envelope.svg" alt="Hero" width={300} height={300} />

            <p className="text-center text-sm text-muted-foreground">
              You don&apos;t have any templates yet. Create your first template to get started.
            </p>
            <form>
              <Button
                formAction={async () => {
                  "use server";
                  const templateId = uuidv4();
                  await createTemplate({ name: "Untitled", content: "", id: templateId });
                  redirect(`/editor/${templateId}`);
                }}
              >
                <PlusIcon className="w-4 h-4" />
                Create your first template
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
