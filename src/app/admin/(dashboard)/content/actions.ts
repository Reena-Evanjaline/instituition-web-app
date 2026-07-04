"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { defaultContent } from "@/lib/content";

export type ContentState = { ok?: boolean; error?: string };

export async function saveContent(
  _prev: ContentState,
  formData: FormData,
): Promise<ContentState> {
  await requireAdmin();
  const page = formData.get("__page") as keyof typeof defaultContent;
  const defaults = defaultContent[page] as Record<string, string> | undefined;
  if (!defaults) return { error: "Unknown page." };

  try {
    for (const key of Object.keys(defaults)) {
      const value = String(formData.get(key) ?? "");
      await prisma.contentBlock.upsert({
        where: { page_key: { page: page as string, key } },
        create: { page: page as string, key, value },
        update: { value },
      });
    }
  } catch {
    return { error: "Could not save content. Please try again." };
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

export async function resetPageContent(formData: FormData) {
  await requireAdmin();
  const page = formData.get("__page") as string;
  try {
    await prisma.contentBlock.deleteMany({ where: { page } });
  } catch {
    // ignore
  }
  revalidatePath("/", "layout");
  revalidatePath("/admin/content");
}
