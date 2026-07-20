# Security

## Principles

1. **Least privilege** — every resource is private by default; access is granted explicitly.
2. **Server-side enforcement** — Firestore and Storage security rules are the authoritative access control layer. Client-side checks are UX convenience only.
3. **No secrets committed** — credentials, service accounts, and API keys must never appear in source control.
4. **Validate at the boundary** — all user input (file uploads, form data) is validated server-side before being stored.

---

## Secrets management

| Variable type | Location | Committed? |
|---------------|----------|-----------|
| Public Firebase config (`NEXT_PUBLIC_FIREBASE_*`) | `.env.local` → Vercel env | No (`.env.local` is gitignored) |
| Firebase Admin service account | `FIREBASE_SERVICE_ACCOUNT_JSON` env var | Never |
| Any future API keys | `.env.local` → Vercel env | Never |

Template with placeholder values only: `.env.example` (committed).

**Rule:** If a value looks like a real credential, it must not be committed.

---

## Firestore security rules

### `jobs` collection

```
allow read: if resource.data.status == "published";
allow write: if isAdmin();
```

Draft and archived jobs are never readable by the public.

### `applications` collection

```
allow read, write: if false;
```

Applications are **never** accessed directly from the browser. Public submission
and authenticated admin operations use server code backed by the Admin SDK.
Even the applicant cannot read their submission after creation.

### `admins` collection

```
allow read, write: if isAdmin();
```

Admin status is verified server-side via the Firebase Admin SDK. The `admins` collection is never queried from the client.

### `contactMessages` collection

```
allow read, write: if false;
```

- The public form posts to `/api/contact`; it never writes to Firestore directly.
- The Route Handler verifies App Check in production, validates field lengths and
  email format, and silently discards honeypot submissions.
- Admin message reads and status updates use the Admin SDK only after verifying
  the session cookie and membership in `admins/{uid}`.

---

## Firebase Storage rules

```
match /resumes/{applicationId}/{fileName} {
  allow read, write: if false; // All access via Admin SDK server-side only
}
```

- Resume uploads are handled by a server Route Handler using the Admin SDK.
- Download links are signed URLs with short expiry, generated server-side on admin request.
- No public bucket listing.

---

## File upload validation

Enforced server-side in the upload Route Handler:

| Check | Constraint |
|-------|-----------|
| MIME type | `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
| File size | Max 5 MB |
| File name | Sanitised before storage (no path traversal) |
| Virus scanning | Deferred to Phase 5 (Cloud Storage scanning extension) |

Resume objects are private and downloaded by admins only through signed URLs
that expire after five minutes. If the application record cannot be created,
the server removes its uploaded resume.

## Applicant consent

- Privacy-policy acceptance and explicit recruitment-processing consent are required.
- The server records both consent flags and a server-generated consent timestamp.
- Each record contains the exact job ID and denormalised position title.
- Applicants can request access, correction, or deletion at `info@debageri.se`.
- A final retention period and automated deletion policy require approval before launch.

## Rich job descriptions

- Job descriptions are sanitised on every create and edit before storage.
- Only headings, paragraphs, basic emphasis, lists, blockquotes, safe links,
  alignment, and restricted colours are retained.
- Scripts, event handlers, embedded content, and unsafe URL schemes are removed
  before HTML is rendered on the public Careers page.

---

## Admin authentication

- Firebase Authentication email/password.
- After login, a session cookie is issued (server-side, `httpOnly`, `secure`, `sameSite=strict`).
- Every admin Route Handler and Server Component verifies the session cookie using the Firebase Admin SDK.
- The cookie has a 7-day expiry; the user is prompted to re-authenticate for sensitive operations.

---

## Firebase App Check

Enforced before any production deployment that exposes Firestore or Storage:

- **Web client:** reCAPTCHA v3 provider.
- **App Check token** required on all Firestore and Storage requests.
- Failure to pass App Check returns a 403; no data is exposed.
- The contact Route Handler explicitly verifies the `X-Firebase-AppCheck` token
  before accepting a production submission.

---

## Content Security Policy (planned)

A strict CSP will be added in Phase 5:

- `default-src 'self'`
- Specific allowlists for Firebase SDKs, Google Fonts
- `report-uri` to a monitoring endpoint

---

## GDPR / data retention

- Applicant personal data is stored in Firestore and Firebase Storage.
- Data retention policy and deletion mechanism to be designed in Phase 5.
- Privacy policy must be published before the application form goes live.
- Contact messages include an `expiresAt` value 12 months after submission.
  Enable Firestore TTL on that field so expired messages are deleted automatically.
