# arcorath.github.io

Personal portfolio of **Adarsh Mishra** ([@ArcoRATH](https://github.com/ArcoRATH))

**Live:** https://arcorath.github.io

## Stack

- Next.js (App Router, static export) + TypeScript
- Tailwind CSS v4
- Framer Motion
- Custom canvas particle field + interactive terminal easter egg

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
npm run lint
```

## Deployment

Automatic: every push to `main` runs `.github/workflows/deploy.yml` → builds → deploys to GitHub Pages (Source: GitHub Actions).

## Adding content

All site content (taglines, skills, projects, socials) lives in `src/lib/data.ts` — edit that file to update the site.
