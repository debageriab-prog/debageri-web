# Firestore Schema

## Collections

### `jobs`

Represents a job posting. Managed by admins.

```ts
interface Job {
  id: string;                    // Firestore document ID (slug-like)
  title: string;                 // e.g. "Senior Java Developer"
  description: string;           // Sanitised rich HTML job-ad copy
  descriptionText: string;       // Plain-text search projection
  cities: string[];              // One or more possible assignment cities
  languages: string[];           // One or more working languages
  status: "draft" | "published" | "archived";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp | null;
  archivedAt: Timestamp | null;
  expiresAt: Timestamp | null;   // Hidden from Careers after this time
  createdBy: string;             // Admin UID
  updatedBy: string | null;      // Last editing admin UID
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

### `contactMessages`

Stores inquiries submitted from the public contact form. All access goes through
server code using the Firebase Admin SDK; browser Firestore clients have no access.

```ts
interface ContactMessage {
  id: string;
  fullName: string;
  email: string;                 // Trimmed and lowercased
  message: string;
  status: "unread" | "read" | "replied" | "ignored";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  statusUpdatedAt: Timestamp | null;
  statusUpdatedBy: string | null; // Admin UID
  expiresAt: Timestamp;           // createdAt + 12 months
}
```

**Security and retention:**
- Direct client reads and writes are denied.
- Public submissions are validated and App Check verified by `/api/contact`.
- Admin reads and status changes require a verified session cookie.
- Firestore TTL must be enabled on `expiresAt` for automatic deletion.

---

## Indexes

Planned composite indexes:

| Collection | Fields | Order | Used by |
|-----------|--------|-------|---------|
| `jobs` | `status`, `publishedAt` | `publishedAt DESC` | Public job listing |
| `applications` | `jobId`, `createdAt` | `createdAt DESC` | Admin applicant view per job |
| `applications` | `status`, `createdAt` | `createdAt DESC` | Admin filtering by status |
| `contactMessages` | `status`, `createdAt` | `createdAt DESC` | Admin message status filters |

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
