"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import type { MessageStatus } from "@/generated/prisma/client";

export async function setMessageStatus(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const status = formData.get("status") as MessageStatus;
  try {
    await prisma.contactMessage.update({ where: { id }, data: { status } });
  } catch {
    // ignore
  }
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  try {
    await prisma.contactMessage.delete({ where: { id } });
  } catch {
    // ignore
  }
  revalidatePath("/admin/messages");
}
