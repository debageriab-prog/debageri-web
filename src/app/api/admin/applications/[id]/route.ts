import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";
import { getAdminDb, getAdminStorage } from "@/lib/firebase/admin";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const { id } = await params;
  const applicationRef = getAdminDb().collection("applications").doc(id);

  try {
    const snapshot = await applicationRef.get();
    if (!snapshot.exists) {
      return NextResponse.json({ message: "Candidate not found." }, { status: 404 });
    }

    const resumeStoragePath = snapshot.data()?.resumeStoragePath;
    if (typeof resumeStoragePath === "string" && resumeStoragePath) {
      await getAdminStorage().bucket().file(resumeStoragePath).delete({ ignoreNotFound: true });
    }
    await applicationRef.delete();
  } catch (error) {
    console.error("Failed to delete candidate", error);
    return NextResponse.json({ message: "The candidate could not be deleted." }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
