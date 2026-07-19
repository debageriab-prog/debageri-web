# Firestore Schema

## Collections

### `jobs`

Represents a job posting. Managed by admins.

```ts
interface Job {
  id: string;                    // Firestore document ID (slug-like)
  title: string;                 // e.g. "Senior Java Developer"
  location: string;              // e.g. "Gothenburg, Sweden (on-site)"
  employmentType: string;        // e.g. "Consultancy", "Full-time"
  summary: string;               // Short description shown on listing
  description: string;           // Full Markdown/rich text description
  requirements: string[];        // Bullet points
  niceToHave: string[];          // Optional bullet points
  status: "draft" | "published" | "archived";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp | null;
  archivedAt: Timestamp | null;
  createdBy: string;             // Admin UID
}
```

**Security rules:**
- Read: public for `status == "published"` only
- Write: admin only

---

### `applications`

Represents a job application submitted by a candidate.

```ts
interface Application {
  id: string;                    // Firestore document ID
  jobId: string;                 // Reference to jobs/{jobId}
  jobTitle: string;              // Denormalised for display
  applicantName: string;
  applicantEmail: string;
  message: string;               // Cover letter / message
  resumeStoragePath: string;     // Firebase Storage path
  resumeFileName: string;        // Original file name
  status: ApplicationStatus;
  internalNotes: InternalNote[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

type ApplicationStatus =
  | "new"
  | "reviewing"
  | "interview"
  | "technical_interview"
  | "offer"
  | "hired"
  | "rejected"
  | "withdrawn";

interface InternalNote {
  id: string;
  text: string;
  createdAt: Timestamp;
  createdBy: string;             // Admin UID
}
```

**Security rules:**
- Read: admin only — never exposed publicly
- Write (create): any authenticated or anonymous user (application submission)
- Write (update): admin only

---

### `admins`

Tracks which Firebase Authentication UIDs have admin access.

```ts
interface Admin {
  uid: string;                   // Matches Firebase Auth UID (also the document ID)
  email: string;
  displayName: string;
  createdAt: Timestamp;
}
```

**Security rules:**
- Read: admin only (checked server-side via Admin SDK)
- Write: admin only

---

## Indexes

Planned composite indexes:

| Collection | Fields | Order | Used by |
|-----------|--------|-------|---------|
| `jobs` | `status`, `publishedAt` | `publishedAt DESC` | Public job listing |
| `applications` | `jobId`, `createdAt` | `createdAt DESC` | Admin applicant view per job |
| `applications` | `status`, `createdAt` | `createdAt DESC` | Admin filtering by status |

---

## Storage structure

```
resumes/
  {applicationId}/
    {sanitisedFileName}         Max 5 MB, PDF/DOC/DOCX only
```

Storage security rules must ensure:
- Only the upload Route Handler (using Admin SDK) can write.
- No public read access.
- Admins can download via signed URLs generated server-side.
