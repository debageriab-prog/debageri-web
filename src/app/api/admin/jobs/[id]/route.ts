import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";
import { getAdminDb } from "@/lib/firebase/admin";
import { jobDescriptionToText, sanitizeJobDescription } from "@/lib/job-rich-text";
import { validateJobSubmission } from "@/lib/job-validation";

const MAX_REQUEST_BYTES = 32_768;

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdminSession();
  if (!admin) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  const { id } = await params;
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

  const { data, errors } = validateJobSubmission({ ...(body as object), id });
  const description = sanitizeJobDescription(data.description);
  const descriptionText = jobDescriptionToText(description);
  if (descriptionText.length < 40) errors.description = "Enter at least 40 characters of job-description text.";
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: "Check the highlighted fields.", fieldErrors: errors }, { status: 400 });
  }

  const reference = getAdminDb().collection("jobs").doc(id);
  if (!(await reference.get()).exists) {
    return NextResponse.json({ message: "Job not found." }, { status: 404 });
  }

  try {
    await reference.update({
      title: data.title,
      description,
      descriptionText,
      cities: data.cities,
      languages: data.languages,
      swedenOnly: data.swedenOnly,
      remotePosition: data.remotePosition,
      expiresAt: data.expiresAt ? Timestamp.fromDate(new Date(data.expiresAt)) : null,
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: admin.uid,
    });
  } catch (error) {
    console.error("Failed to update job", error);
    return NextResponse.json({ message: "The job could not be updated." }, { status: 500 });
  }

  return NextResponse.json({ id });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdminSession();
  if (!admin) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  const { id } = await params;
  try {
    await getAdminDb().collection("jobs").doc(id).delete();
  } catch (error) {
    console.error("Failed to delete job", error);
    return NextResponse.json({ message: "The job could not be deleted." }, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}
