# Ayush Kapoor — Portfolio

A fully custom, full-stack portfolio built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**. Designed from scratch — editorial "engineering dossier" aesthetic with an ink/bone/signal-orange palette, serif + grotesk + mono typography, film-grain texture, and smooth scroll.

## Features

**Design & motion**
- Counter preloader with slide-up exit, film-grain noise overlay, custom magnetic cursor (dot + spring ring)
- Scroll-parallax hero with mouse-tracking spotlight and vertical grid lines
- Lenis smooth scrolling, scroll progress bar, hide-on-scroll nav with text-scramble hover
- Hover-expand project rows (editorial list style, not cards), sticky-sidebar experience timeline
- Section headings styled as API endpoints (`GET /profile · 200 OK`)
- Live IST clock in the footer

**Full-stack**
- `POST /api/contact` — zod-validated contact form, email delivery via Resend, per-IP rate limiting
- `GET /api/github` — live GitHub stats (repos, stars, followers, top languages), server-cached for 1 hour
- Interactive terminal easter egg (press `` ` `` or click `~/terminal`) with `whoami`, `stack`, `projects`, `contact`, `resume` commands
- **`/admin` dashboard** — password-protected content editor, no database needed (see below)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Enables contact-form email delivery (free at resend.com). Without it the form returns "not configured". |
| `CONTACT_TO` | Recipient inbox (defaults to ayushkempire@gmail.com) |
| `CONTACT_FROM` | Verified sender; defaults to Resend's onboarding sender |
| `GITHUB_TOKEN` | Optional — raises the GitHub API rate limit for live stats |

## Deploying

Best on [Vercel](https://vercel.com): import the repo, set the env vars, deploy. The site is statically prerendered; only the two API routes run on demand.

## Content & the admin dashboard

Content resolution order:
1. `content/content.json` — if it exists, it wins (this is what `/admin` writes)
2. `src/lib/data.ts` — the code defaults / fallback

Open **`/admin`**, sign in with `ADMIN_PASSWORD` (set in `.env.local`), edit any section — profile, experience, projects, skills, certifications, socials — and hit **Save changes**. The API writes `content/content.json` and revalidates the homepage, so edits go live instantly. No database anywhere.

**How it works without a DB:** the dashboard is just a form over a JSON file. Locally (or on any Node host like a VPS/Railway), saves persist to disk. After editing, commit `content/content.json` to git so deploys carry your content. Note: on Vercel the filesystem is read-only at runtime, so use the admin locally → commit → push (which is also the safest workflow).

The resume PDF is `public/Resume.pdf` — replace the file to update it.
