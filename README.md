# Katana

Personal portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

## Environment

Create `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL` – Base URL for the site
- `NEXT_PUBLIC_CONTACT_EMAIL` – Contact email (optional)

## Content

- **Blog posts**: Add `.mdx` files to `content/blog/`
- **Projects**: Add `.mdx` files to `content/projects/`

Run `npm run velite` to regenerate content after changes.

## Tech Stack

Next.js 15 · TypeScript · Tailwind CSS · Velite · Framer Motion · next-themes
