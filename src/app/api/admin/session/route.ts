import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_DURATION_MS,
} from "@/lib/admin-session";
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const idToken =
    body && typeof body === "object" && "idToken" in body && typeof body.idToken === "string"
      ? body.idToken
      : "";
  if (!idToken) {
    return NextResponse.json({ message: "Authentication failed." }, { status: 401 });
  }

  try {
    const decoded = await getAdminAuth().verifyIdToken(idToken, true);
    if (Date.now() / 1_000 - decoded.auth_time > 5 * 60) {
      return NextResponse.json({ message: "Authentication failed." }, { status: 401 });
    }
    const admin = await getAdminDb().collection("admins").doc(decoded.uid).get();
    if (!admin.exists) {
      return NextResponse.json({ message: "Authentication failed." }, { status: 403 });
    }

    const sessionCookie = await getAdminAuth().createSessionCookie(idToken, {
      expiresIn: ADMIN_SESSION_DURATION_MS,
    });
    (await cookies()).set(ADMIN_SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ADMIN_SESSION_DURATION_MS / 1_000,
      path: "/",
    });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ message: "Authentication failed." }, { status: 401 });
  }
}

export async function DELETE() {
  (await cookies()).set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  return new NextResponse(null, { status: 204 });
}
