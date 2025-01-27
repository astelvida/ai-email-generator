"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "../lib/db";
import { templates } from "../lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTemplate(newTemplate: { id: string; name: string; content: string }) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not found");

    await db.insert(templates).values({
      id: newTemplate.id,
      title: newTemplate.name,
      content: newTemplate.content,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`.trim(),
      userEmail: user.emailAddresses[0].emailAddress,
    });

    revalidatePath("/dashboard");
    redirect(`/editor/${newTemplate.id}`);

    return { success: true };
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
