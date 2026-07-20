import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { safeResumeName, validateApplication, validateResume } from "@/lib/application-validation";
import { getAdminAppCheck, getAdminDb, getAdminStorage } from "@/lib/firebase/admin";

const MAX_REQUEST_BYTES = 6 * 1024 * 1024;

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_REQUEST_BYTES) {
    return NextResponse.json({ message: "The application is too large." }, { status: 413 });
  }
  if (process.env.NODE_ENV === "production") {
    const token = request.headers.get("X-Firebase-AppCheck");
    try {
      if (!token) throw new Error();
      await getAdminAppCheck().verifyToken(token);
    } catch {
      return NextResponse.json({ message: "Unable to verify this submission." }, { status: 401 });
    }
  }

  let formData: FormData;
  try { formData = await request.formData(); } catch {
    return NextResponse.json({ message: "Invalid application." }, { status: 400 });
  }
  const { data, errors } = validateApplication(formData);
  const resume = formData.get("resume");
  const resumeError = validateResume(resume);
  if (resumeError) errors.resume = resumeError;
  const jobId = formData.get("jobId");
  if (typeof jobId !== "string" || !jobId || Object.keys(errors).length > 0 || !(resume instanceof File)) {
    return NextResponse.json({ message: "Check the highlighted fields.", fieldErrors: errors }, { status: 400 });
  }

  const jobSnapshot = await getAdminDb().collection("jobs").doc(jobId).get();
  const job = jobSnapshot.data();
  const expiresAt = job?.expiresAt?.toDate?.() as Date | undefined;
  if (!jobSnapshot.exists || job?.status !== "published" || (expiresAt && expiresAt.getTime() <= Date.now())) {
    return NextResponse.json({ message: "This opportunity is no longer accepting applications." }, { status: 409 });
  }

  const applicationRef = getAdminDb().collection("applications").doc();
  const fileName = safeResumeName(resume.name);
  const storagePath = `resumes/${applicationRef.id}/${fileName}`;
  const storageFile = getAdminStorage().bucket().file(storagePath);
  try {
    await storageFile.save(Buffer.from(await resume.arrayBuffer()), {
      resumable: false,
      contentType: resume.type,
      metadata: { cacheControl: "private, no-store", metadata: { applicationId: applicationRef.id } },
    });
    await applicationRef.create({
      jobId, jobTitle: String(job?.title ?? jobId), firstName: data.firstName, lastName: data.lastName,
      email: data.email, phoneCountry: data.phoneCountry, phoneNumber: data.phoneNumber,
      linkedinUrl: data.linkedinUrl, resumeStoragePath: storagePath, resumeFileName: resume.name,
      resumeContentType: resume.type, privacyConsent: true, dataProcessingConsent: true,
      consentedAt: FieldValue.serverTimestamp(), status: "new", createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(), statusUpdatedAt: null, statusUpdatedBy: null,
    });
  } catch (error) {
    await storageFile.delete({ ignoreNotFound: true }).catch(() => undefined);
    console.error("Failed to store job application", error);
    return NextResponse.json({ message: "We could not submit your application. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
