# Rmahesa Portfolio

A personal portfolio website with a poetic landing page, public content pages, and an admin CMS built with Next.js, Prisma, PostgreSQL, and Tailwind CSS.

## Stack

- Next.js App Router
- Tailwind CSS
- Prisma + PostgreSQL (Neon-ready)
- JWT cookie auth for the admin dashboard
- Vercel deployment ready

## Getting Started

1. Copy `.env.example` to `.env` and fill in the values.
2. Install dependencies.
3. Run Prisma generate and seed.
4. Start the dev server.

```bash
npm install
npx prisma generate
npx prisma db seed
npm run dev
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run prisma:generate`
- `npm run prisma:seed`

## Notes

- The project is configured for a Neon PostgreSQL connection.
- Replace placeholder profile images and social links with your own content.
- Optional Cloudinary media uploads are available for CMS image fields when the Cloudinary env vars are set.
