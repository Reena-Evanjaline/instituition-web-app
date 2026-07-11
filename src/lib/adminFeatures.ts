import { redirect } from "next/navigation";

/**
 * Admin section toggles.
 *
 * Nothing is deleted — every admin section still exists in the codebase.
 * To hand a section back to the client, flip its flag to `true`: it will
 * reappear in the sidebar and its route becomes reachable again.
 *
 * For now only Seminars is enabled.
 */
export const adminFeatures = {
  dashboard: true,
  seminars: true,
  registrations: true,
  messages: false,
  content: false,
} as const;

export type AdminFeature = keyof typeof adminFeatures;

/** The section a disabled route falls back to (must stay enabled). */
export const ADMIN_HOME = "/admin/seminars";

export function isAdminFeatureEnabled(feature: AdminFeature): boolean {
  return adminFeatures[feature];
}

/**
 * Guard for a server component: redirect to the enabled home when the
 * given section is currently disabled. No-op once the flag is `true`.
 */
export function requireAdminFeature(feature: AdminFeature): void {
  if (!isAdminFeatureEnabled(feature)) {
    redirect(ADMIN_HOME);
  }
}
