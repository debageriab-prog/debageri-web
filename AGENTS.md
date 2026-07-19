# AGENTS.md — Debageri Web

Guidelines for AI assistants (Cursor, Copilot, Claude, etc.) working on this repository.

---

## Company context

**Debageri AB** is a small Swedish IT consultancy headquartered in Gothenburg, founded by Shahab Bagheri.

**Name origin:** "Debug" + *bageri* (Swedish for bakery) + founder surname *Bagheri*. Think of it as a "debug bakery" — raw ingredients, careful craft, something people can actually use.

**Current team:**
| Name | Role |
|------|------|
| Shahab Bagheri | CEO, Senior Java Developer — consulting at Zenseact AB |
| Vahid Bafghi | Embedded Developer — consulting at Zenseact AB |

**Compensation model:** Consultants receive a generous share of what they bill and allocate it across salary, pension, equipment, conferences, education, car leasing, and similar benefits.

---

## Product goals

### Public website
- **Homepage** — hero, about, compensation model, name story, careers CTA
- **About** — company philosophy and story
- **Team** — current members and roles
- **Careers** — open positions listing
- **Job detail** — individual job page
- **Job application** — form with resume upload

### Admin panel (authenticated)
- Create, update, publish, and archive job postings
- View applicants per job
- Change application status
- Add internal notes
- Download applicant resumes

---

## Architecture

| Concern | Technology |
|---------|-----------|
| Framework | Next.js (App Router, latest) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Linting | ESLint with `eslint-config-next` |
| Auth (planned) | Firebase Authentication |
| Database (planned) | Cloud Firestore |
| File storage (planned) | Firebase Storage |
| App protection (planned) | Firebase App Check |
| Email (planned) | TBD |
| Hosting (planned) | Vercel |

Directory layout:
```
src/
  app/           Next.js App Router pages and layouts
  components/    Shared UI components
  lib/           Utilities, helpers, Firebase client/admin
  types/         Shared TypeScript type definitions
docs/            Architecture, branding, schema, roadmap, security docs
.github/         CI workflows, PR template, issue templates
```

---

## Coding conventions

1. **TypeScript strict mode** — never use `any`; use `unknown` + narrowing when necessary.
2. **Named exports** for components; default exports only for Next.js page/layout files.
3. **File names** — `PascalCase` for components (`Header.tsx`), `kebab-case` for utility files.
4. **Import alias** — always use `@/*` to reference `src/*`.
5. **No barrel files** (`index.ts` re-exports) unless the directory grows large enough to warrant it.
6. **Comments** — only for non-obvious intent or constraints. Never narrate what the code does.
7. **Server vs client** — prefer React Server Components. Add `"use client"` only when interactivity requires it (event handlers, hooks, browser APIs).
8. **Accessibility** — semantic HTML, `aria-*` attributes where needed, `focus-visible` outlines, WCAG AA colour contrast.
9. **No inline styles** — use Tailwind utility classes; extend the theme via `@theme` in `globals.css`.
10. **Environment variables** — never hardcode secrets; use `.env.local` (gitignored); document in `.env.example`.

---

## Design direction

See `docs/branding.md` and `docs/design.md` for full details.

**TL;DR for AI assistants:**
- Background: `#F7F2EA` (warm beige)
- Primary text: `#3D3027` (dark brown)
- Accent: warm brown tones (`#9a7a63`, `#c4a98e`)
- Card surface: `#fdfaf6`
- No bright gradients, dark themes, stock photos, or generic SaaS styling.
- Scandinavian minimalism: generous whitespace, clean typography, subtle bakery/circuit details.

---

## Firebase guidance (for future PRs)

- **Never** initialise Firebase in a server component directly — use a dedicated `src/lib/firebase/client.ts` (browser) and `src/lib/firebase/admin.ts` (server) module.
- Public config (`NEXT_PUBLIC_FIREBASE_*`) is safe to ship to the browser; treat service-account JSON as a server-only secret.
- App Check must be enforced before any production deploy that exposes Firestore or Storage rules.
- Firestore security rules live in `firestore.rules`; Storage rules in `storage.rules`. Both must be reviewed before any write path is opened to the public.

---

## Expected AI-assistant behaviour

- Read this file and `docs/` before suggesting architecture changes.
- Respect the TypeScript strict settings — do not relax them.
- Do not install unnecessary dependencies; prefer built-ins and Next.js primitives.
- Do not generate placeholder secrets or committed credentials.
- When unsure about a Next.js API, check `node_modules/next/dist/docs/` — this version may differ from training data.
- Always check that lint, typecheck, and build pass before considering work complete.
- Use conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
