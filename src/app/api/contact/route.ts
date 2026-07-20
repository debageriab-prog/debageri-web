import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { validateContactSubmission } from "@/lib/contact-validation";
import { getAdminAppCheck, getAdminDb } from "@/lib/firebase/admin";

const MAX_REQUEST_BYTES = 16_384;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { message: "The submitted message is too large." },
      { status: 413 },
    );
  }

  if (process.env.NODE_ENV === "production") {
    const token = request.headers.get("X-Firebase-AppCheck");
    if (!token) {
      return NextResponse.json({ message: "Unable to verify this submission." }, { status: 401 });
    }

    try {
      await getAdminAppCheck().verifyToken(token);
    } catch {
      return NextResponse.json({ message: "Unable to verify this submission." }, { status: 401 });
    }
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_REQUEST_BYTES) {
      return NextResponse.json(
        { message: "The submitted message is too large." },
        { status: 413 },
      );
    }
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const { data, errors } = validateContactSubmission(body);

  if (data.website) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "Check the highlighted fields.", fieldErrors: errors },
      { status: 400 },
    );
  }

  const expiresAt = new Date();
  expiresAt.setUTCFullYear(expiresAt.getUTCFullYear() + 1);

  try {
    await getAdminDb().collection("contactMessages").add({
      fullName: data.fullName,
      email: data.email,
      message: data.message,
      status: "unread",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      statusUpdatedAt: null,
      statusUpdatedBy: null,
      expiresAt: Timestamp.fromDate(expiresAt),
    });
  } catch (error) {
    console.error("Failed to store contact message", error);
    return NextResponse.json(
      { message: "We could not send your message. Please try again or email us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
