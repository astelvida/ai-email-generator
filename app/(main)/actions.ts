"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../lib/db";
import { Template, templates } from "../../lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTemplate(newTemplate: { name: string; content: string }) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not found");

    const [createdTemplate] = await db
      .insert(templates)
      .values({
        title: newTemplate.name,
        content: newTemplate.content,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`.trim(),
        userEmail: user.emailAddresses[0].emailAddress,
      })
      .returning();

    revalidatePath("/dashboard");

    redirect(`/editor/${createdTemplate.id}`);

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateTemplate(templateId: string, latestTemplate: Partial<Template>) {
  try {
    await db.update(templates).set(latestTemplate).where(eq(templates.id, templateId));

    revalidatePath("/dashboard");
    revalidatePath(`/editor/${templateId}`);
    // redirect(`/editor/${templateId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteTemplate(templateId: string) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not found");

    await db.delete(templates).where(eq(templates.id, templateId));
  } catch (error) {
    console.error(error);
    throw error;
  }
}
