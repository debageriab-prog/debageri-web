import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";

export const ADMIN_SESSION_COOKIE = "debageri_admin_session";
export const ADMIN_SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1_000;

export interface AdminSession {
  uid: string;
  email: string;
  displayName: string;
}

export async function verifyAdminSession(): Promise<AdminSession | null> {
  const sessionCookie = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await getAdminAuth().verifySessionCookie(sessionCookie, true);
    const adminSnapshot = await getAdminDb().collection("admins").doc(decoded.uid).get();
    if (!adminSnapshot.exists) return null;

    const data = adminSnapshot.data();
    return {
      uid: decoded.uid,
      email: typeof data?.email === "string" ? data.email : decoded.email ?? "",
      displayName:
        typeof data?.displayName === "string" && data.displayName.trim()
          ? data.displayName
          : decoded.email ?? "Admin",
    };
  } catch {
    return null;
  }
}

export async function requireAdminSession(): Promise<AdminSession> {
  const admin = await verifyAdminSession();
  if (!admin) redirect("/admin/login");
  return admin;
}
