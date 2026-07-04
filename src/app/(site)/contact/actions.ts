"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  organization: z.string().optional(),
  subject: z.string().min(1, "Please choose a subject."),
  message: z.string().min(10, "Please write a message (at least 10 characters)."),
});

export type ContactState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    organization: formData.get("organization"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as string] = issue.message;
    }
    return { ok: false, error: "Please fix the errors below.", fieldErrors };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        organization: parsed.data.organization || null,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Something went wrong saving your message. Please try again.",
    };
  }
}
