# AI Institute for Native Americans

A modern, elegant Next.js rebuild of the AI Institute for Native Americans site —
same content and structure as the original, redesigned for a more polished look and
a perfect mobile experience, with a full admin panel and Stripe-powered registration.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** design system (earthy, sovereignty-inspired palette)
- **Prisma 6 + MySQL** for data
- **Stripe** checkout for seminar registration & giving
- **JWT cookie sessions** (jose + bcrypt) for admin auth
- **Framer Motion** for tasteful scroll animations

## Public pages

`/` Home · `/about` · `/seminars` · `/causes` · `/why-it-matters` ·
`/contact` (working form) · `/register` (Stripe checkout) · `/register/success`

## Admin panel (`/admin`)

Sign in at `/admin/login`. Manage:

- **Dashboard** — key stats & recent registrations
- **Seminars** — full create / edit / publish / delete
- **Registrations** — view, filter by status, update payment status
- **Messages** — read / archive / reply to contact submissions
- **Page Content (CMS)** — edit the text across every public page, live

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment** — copy `.env.example` to `.env` and set your
   `DATABASE_URL` (MySQL) and `AUTH_SECRET`. Stripe keys are optional; without
   them the site runs in **demo mode** (registrations are recorded, no charge).
   For real payments, see **[docs/PAYMENTS.md](docs/PAYMENTS.md)** — a step-by-step
   guide to getting Stripe (and PayPal) API keys for both test and live modes.

3. **Set up the database** (generates the client, creates tables, seeds data):

   ```bash
   npm run setup
   ```

   This seeds an admin account and five seminars. Default admin login:

   - Email: `admin@aiinstitute.org`
   - Password: `ChangeMe123!` (override via `SEED_ADMIN_*` in `.env`)

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Visit http://localhost:3000 and the admin at http://localhost:3000/admin.

## Stripe setup (optional)

1. Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env`.
2. For local webhook testing:
   `stripe listen --forward-to localhost:3000/api/stripe/webhook`
   and set the printed signing secret as `STRIPE_WEBHOOK_SECRET`.

## Useful scripts

| Script              | Description                             |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Start the dev server                    |
| `npm run build`     | Production build                        |
| `npm run db:push`   | Sync the Prisma schema to MySQL         |
| `npm run db:seed`   | Seed admin user + seminars              |
| `npm run db:studio` | Open Prisma Studio (visual DB browser)  |
