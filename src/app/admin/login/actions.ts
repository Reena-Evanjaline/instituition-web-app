"use server";

import { redirect } from "next/navigation";
import { authenticate, createSession } from "@/lib/auth";
import { ADMIN_HOME } from "@/lib/adminFeatures";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  let session;
  try {
    session = await authenticate(email, password);
  } catch {
    return { error: "Unable to reach the database. Please try again." };
  }

  if (!session) {
    return { error: "Invalid email or password." };
  }

  await createSession(session);
  redirect(ADMIN_HOME);
}
