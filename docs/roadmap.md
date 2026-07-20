# Roadmap

## Phase 1 — Foundation ✅

**Goal:** Establish the project structure, design system, and homepage shell.

- [x] Next.js with App Router, TypeScript strict, Tailwind CSS v4
- [x] Design tokens (colour palette, typography)
- [x] Homepage shell: header, hero, about, compensation, name story, careers CTA, footer
- [x] Stub pages: about, team, careers
- [x] Documentation: architecture, branding, design, schema, roadmap, security
- [x] `.env.example`, `.editorconfig`
- [x] GitHub Actions CI (install, lint, typecheck, build)
- [x] PR template and issue templates

---

## Phase 2 — Public pages

**Goal:** Complete all public-facing pages.

- [ ] Homepage: finalise with real content and photography
- [ ] About page: company story, philosophy, values
- [ ] Team page: member profiles, photos
- [x] Careers listing page: searchable published jobs from Firestore
- [ ] Job detail page: full description, requirements, apply CTA
- [x] Application form: contact details, LinkedIn, consent, and resume upload
- [x] Form validation (browser constraints + server enforcement)
- [x] Success / error states
- [x] Contact page: validated form, success/error states, and email alternative

---

## Phase 3 — Firebase integration

**Goal:** Connect the backend services.

- [ ] Firebase project setup (dev and prod)
- [ ] Firebase config environment variables
- [ ] `src/lib/firebase/client.ts` — browser SDK
- [ ] `src/lib/firebase/admin.ts` — server Admin SDK
- [ ] Firebase Authentication setup (email/password for admins)
- [ ] Firestore security rules
- [ ] Firebase Storage rules
- [ ] Firebase App Check (reCAPTCHA v3)
- [x] Contact message storage and App Check verification
- [x] Private resume upload in server Route Handler
- [x] App Check-protected application submission Route Handler

---

## Phase 4 — Admin panel

**Goal:** Fully functional admin interface.

- [ ] Admin login page
- [ ] Session cookie auth (server-side)
- [ ] Admin layout with auth guard
- [ ] Job CRUD: create, publish, edit, expiry, and delete complete; archive remains
- [x] Candidate list showing the applied job and contact details
- [x] Candidate resume download (internal notes remain planned)
- [x] Status workflow (new → interesting → interview → offer / rejected)
- [ ] Internal notes (append-only)
- [x] Admin login, session protection, and contact message inbox

---

## Phase 5 — Production readiness

**Goal:** Launch-ready.

- [ ] Custom domain setup
- [ ] Email notifications on new applications (provider TBD)
- [ ] Vercel production deployment
- [ ] WCAG AA accessibility audit
- [ ] SEO: sitemap, robots.txt, Open Graph images
- [ ] Performance audit (Lighthouse ≥ 90 across all categories)
- [ ] Error monitoring (Sentry or Vercel Analytics)
- [x] Initial applicant privacy policy (legal review and cookie notice remain)

---

## Deferred / backlog

- Dark mode (requires careful colour palette work)
- Multi-language support (Swedish / English)
- Candidate portal (track own application status)
- Referral programme
- Blog / engineering articles
