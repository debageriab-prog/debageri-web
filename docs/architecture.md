# Architecture

## Stack overview

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js (App Router) | Server components by default |
| Language | TypeScript 5, strict mode | `"strict": true` in tsconfig |
| Styling | Tailwind CSS v4 | `@theme` tokens in `globals.css` |
| Linting | ESLint 9 + `eslint-config-next` | `eslint.config.mjs` |
| Auth (planned) | Firebase Authentication | Email/password for admin |
| Database | Cloud Firestore | Collections: jobs, applications, admins, contactMessages |
| Storage (planned) | Firebase Storage | Resume uploads |
| App protection (planned) | Firebase App Check | Enforced before production |
| Email (planned) | TBD | Notification on new application |
| Hosting | Vercel | Edge-optimised Next.js deployment |

## Directory structure

```
debageri-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx          Root layout (fonts, metadata)
│   │   ├── page.tsx            Homepage
│   │   ├── about/page.tsx
│   │   ├── team/page.tsx
│   │   ├── careers/
│   │   │   ├── page.tsx        Job listing
│   │   │   └── [slug]/
│   │   │       ├── page.tsx    Job detail
│   │   │       └── apply/page.tsx  Application form
│   │   ├── admin/              Protected admin area
│   │   │   ├── layout.tsx      Auth guard
│   │   │   ├── page.tsx        Dashboard
│   │   │   ├── jobs/
│   │   │   └── applicants/
│   │   └── api/                Route handlers
│   │       ├── applications/
│   │       └── admin/
│   ├── components/             Shared UI components
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── client.ts       Browser Firebase SDK
│   │   │   └── admin.ts        Server Firebase Admin SDK
│   │   └── utils.ts
│   └── types/
│       ├── job.ts
│       └── application.ts
├── docs/
├── .github/
├── public/
└── firestore.rules             (planned)
```

## Rendering strategy

- **Public pages** (homepage, about, team, careers, job detail): React Server Components + static generation where possible.
- **Application form**: Server component shell, `"use client"` form for interactivity.
- **Admin panel**: Server-side auth check on every layout render; client components for interactive CRUD forms.
- **API routes** (`/api/*`): Firebase Admin SDK only — never the browser SDK.

## Firebase client split

| Module | SDK | Used in | Secret handling |
|--------|-----|---------|-----------------|
| `src/lib/firebase/client.ts` | `firebase` (browser) | Client components | Public config only (`NEXT_PUBLIC_FIREBASE_*`) |
| `src/lib/firebase/admin.ts` | `firebase-admin` | API routes, server actions | Service account from env var — never committed |

## Auth flow (planned)

1. Admin visits `/admin`.
2. Layout server component calls Firebase Admin to verify the session cookie.
3. If unauthenticated, redirects to `/admin/login`.
4. Login page uses client Firebase Auth to sign in and exchanges the ID token for a session cookie via a Route Handler.
5. All admin Route Handlers verify the session cookie server-side before processing.

## Data flow for job applications

1. Applicant submits form (name, email, message, resume file).
2. Client uploads resume to Firebase Storage via a signed upload URL returned by a Route Handler.
3. Route Handler validates file type, size, and creates the `applications` Firestore document.
4. Admin receives email notification (planned).
5. Admin views application in `/admin/applicants`, changes status, adds notes.

## Contact message flow

1. The browser obtains a Firebase App Check token and posts the form to `/api/contact`.
2. The Route Handler verifies App Check, validates the payload and checks the honeypot.
3. The Firebase Admin SDK writes an `unread` message with a 12-month expiry.
4. An authenticated admin views messages under `/admin/messages`.
5. Opening a message marks it read; the admin can then mark it replied or ignored.

## Job publishing flow

1. An authenticated admin opens `/admin/jobs/new` and enters a unique job ID,
   title, description, cities, and languages.
2. The server verifies the admin session, validates the payload, and creates a
   published Firestore `jobs/{jobId}` document using the Admin SDK.
3. The public Careers page reads published jobs on the server and sorts them by
   publication date.
4. Candidates can search across title, ID, description, cities, and languages.
   Applications are intentionally deferred to the next feature.
