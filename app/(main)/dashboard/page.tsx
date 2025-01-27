import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { EditIcon, Link, PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { db } from "@/lib/db";
import { templates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { CreateTemplateButton } from "./_components/CreateTemplateButton";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const templatesForUser = await db.select().from(templates).where(eq(templates.userId, user?.id));

  const sortedTemplates = templatesForUser.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="flex flex-col gap-10 px-10 md:px-20 lg:px-56 mt-10">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">{`Hello, ${
          user?.username || user?.emailAddresses[0].emailAddress
        }!`}</h3>
        <CreateTemplateButton />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-primary">Workspace</h3>
        {sortedTemplates.length > 0 ? (
          sortedTemplates.map((template) => (
            <div key={template.id} className="flex flex-col gap-2">
              <h2 className="text-lg font-bold"> {template.title}</h2>
              <p className="text-sm text-muted-foreground">by @{template.userName}</p>
              <p className="text-sm text-muted-foreground">
                created at {template.createdAt.toLocaleDateString()}
              </p>
              <Link href={`/editor/${template.id}`} className="w-full">
                <Button className="w-full">
                  <EditIcon className="w-4 h-4" />
                  Edit
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-10">
            <Image src="/envelope.svg" alt="Hero" width={300} height={300} />

            <p className="text-center text-sm text-muted-foreground">
              You don&apos;t have any templates yet. Create your first template to get started.
            </p>
            <CreateTemplateButton />
          </div>
        )}
      </div>
    </div>
  );
}
