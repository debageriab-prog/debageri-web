# Debageri Web

Public website and admin panel for [Debageri AB](https://debageri.se) — a Swedish IT consultancy based in Gothenburg.

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 20 LTS |
| npm | ≥ 10 |

## Local setup

```bash
# 1. Clone the repository
git clone https://github.com/debageriab-prog/debageri-web.git
cd debageri-web

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local and fill in the values

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checker |

## Architecture

```
src/
  app/            Next.js App Router — pages and layouts
  components/     Shared UI components
  lib/            Utilities, Firebase client/admin modules (planned)
  types/          Shared TypeScript types (planned)
docs/
  architecture.md Full architecture overview
  branding.md     Design language and colour palette
  design.md       Detailed design system docs
  firestore-schema.md  Firestore data model
  roadmap.md      Feature roadmap by phase
  security.md     Security requirements and rules
.github/
  workflows/      GitHub Actions CI
  ISSUE_TEMPLATE/ GitHub issue templates
  PULL_REQUEST_TEMPLATE.md
```

Framework: **Next.js** with App Router · **TypeScript** strict · **Tailwind CSS v4** · **ESLint**

Planned backend: Firebase Authentication, Cloud Firestore, Firebase Storage, Firebase App Check.

Planned hosting: Vercel.

## Roadmap (summary)

| Phase | Scope |
|-------|-------|
| 1 — Foundation | Project setup, homepage shell ✅ |
| 2 — Public pages | About, Team, Careers, Job detail, Application form |
| 3 — Firebase | Auth, Firestore rules, Storage rules, App Check |
| 4 — Admin panel | Job CRUD, applicant management, status workflow |
| 5 — Production | Domain, email notifications, monitoring, accessibility audit |

See `docs/roadmap.md` for details.

## Deployment

The project is designed for deployment on **Vercel**:

1. Connect the repository to a Vercel project.
2. Set all `NEXT_PUBLIC_FIREBASE_*` and server-side Firebase variables in Vercel Environment Variables.
3. Do **not** commit `.env.local` or any service-account JSON.

## Contributing

See `AGENTS.md` for coding conventions and AI-assistant guidelines.
Use [conventional commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.
