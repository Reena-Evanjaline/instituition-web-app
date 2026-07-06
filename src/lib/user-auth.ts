import "server-only";
import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "./prisma";
import { hashPassword, verifyPassword } from "./auth";

const COOKIE_NAME = "ai_user_session";
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "dev-insecure-secret-change-me",
);

export type UserSession = {
  userId: string;
  email: string;
  name: string;
};

/* ─── Session ──────────────────────────────────────────────── */

export async function createUserSession(payload: UserSession): Promise<void> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function destroyUserSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getUser(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as UserSession;
  } catch {
    return null;
  }
}

/** Use in protected user pages — redirects to /login if not signed in. */
export async function requireUser(): Promise<UserSession> {
  const session = await getUser();
  if (!session) redirect("/login");
  return session;
}

/* ─── Accounts ─────────────────────────────────────────────── */

const normalizeEmail = (email: string) => email.toLowerCase().trim();

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<UserSession> {
  const cleanEmail = normalizeEmail(email);
  const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
  if (existing) {
    throw new Error("An account with this email already exists.");
  }
  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: cleanEmail,
      passwordHash: await hashPassword(password),
    },
  });
  return { userId: user.id, email: user.email, name: user.name };
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<UserSession | null> {
  const user = await prisma.user.findUnique({
    where: { email: normalizeEmail(email) },
  });
  if (!user) return null;
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return null;
  return { userId: user.id, email: user.email, name: user.name };
}

/* ─── Password reset ───────────────────────────────────────── */

/**
 * Creates a reset token (valid 1 hour) for the given email and returns the
 * reset URL. Returns null if no account matches (caller should not reveal that).
 */
export async function createPasswordReset(email: string): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email: normalizeEmail(email) },
  });
  if (!user) return null;

  const token = randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExpiry: expiry },
  });

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base}/reset-password?token=${token}`;
}

export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { resetToken: token } });
  if (
    !user ||
    !user.resetTokenExpiry ||
    user.resetTokenExpiry.getTime() < Date.now()
  ) {
    return false;
  }
  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await hashPassword(newPassword),
      resetToken: null,
      resetTokenExpiry: null,
    },
  });
  return true;
}
