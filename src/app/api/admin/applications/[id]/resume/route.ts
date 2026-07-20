import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";
import { getAdminDb, getAdminStorage } from "@/lib/firebase/admin";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifyAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const snapshot = await getAdminDb().collection("applications").doc(id).get();
  const path = snapshot.data()?.resumeStoragePath;
  if (!snapshot.exists || typeof path !== "string") return NextResponse.json({ message: "Resume not found" }, { status: 404 });
  const [url] = await getAdminStorage().bucket().file(path).getSignedUrl({ action: "read", expires: Date.now() + 5 * 60 * 1000 });
  return NextResponse.redirect(url);
}
