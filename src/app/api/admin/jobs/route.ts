import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";
import { getAdminDb } from "@/lib/firebase/admin";
import { validateJobSubmission } from "@/lib/job-validation";

const MAX_REQUEST_BYTES = 32_768;

export async function POST(request: Request) {
  const admin = await verifyAdminSession();
  if (!admin) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_REQUEST_BYTES) {
      return NextResponse.json({ message: "The job ad is too large." }, { status: 413 });
    }
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const { data, errors } = validateJobSubmission(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "Check the highlighted fields.", fieldErrors: errors },
      { status: 400 },
    );
  }

  const reference = getAdminDb().collection("jobs").doc(data.id);
  if ((await reference.get()).exists) {
    return NextResponse.json(
      { message: "A job with this ID already exists.", fieldErrors: { id: "Choose a unique job ID." } },
      { status: 409 },
    );
  }

  try {
    await reference.create({
      title: data.title,
      description: data.description,
      cities: data.cities,
      languages: data.languages,
      status: "published",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      publishedAt: FieldValue.serverTimestamp(),
      archivedAt: null,
      createdBy: admin.uid,
    });
  } catch (error) {
    console.error("Failed to publish job", error);
    return NextResponse.json({ message: "The job could not be published." }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
