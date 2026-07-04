"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import type { RegistrationStatus } from "@/generated/prisma/client";

export async function updateRegistrationStatus(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const status = formData.get("status") as RegistrationStatus;
  try {
    await prisma.registration.update({ where: { id }, data: { status } });
  } catch {
    // ignore
  }
  revalidatePath("/admin/registrations");
  revalidatePath("/admin");
}

export async function deleteRegistration(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  try {
    await prisma.registration.delete({ where: { id } });
  } catch {
    // ignore
  }
  revalidatePath("/admin/registrations");
}
