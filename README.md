# Stone & Resin — Next.js Website

A ready‑to‑run website built to outperform NatureStone.com with transparent pricing, strong CTAs, and local SEO for Amelia/Cincinnati, Ohio.

## Features
- Next.js 14 (App Router) + Tailwind CSS
- **Instant Price Estimator** with lead capture
- **Lead API** `/api/lead` forwards to `LEAD_WEBHOOK_URL`
- Pages: Home, Pricing, Projects, Learn (with sample posts), About, Contact, Privacy
- JSON‑LD Organization schema, sitemap, robots.txt
- Accessible components (labels, contrast‑friendly, keyboard‑nav menu)

## Quick Start
```bash
pnpm i    # or npm i / yarn
pnpm dev  # http://localhost:3000
```
_Note:_ You can use `npm` or `yarn` if you prefer.

## Configure Lead Forwarding
Create `.env.local` in the project root:
```
LEAD_WEBHOOK_URL=https://your-webhook-or-zapier-endpoint.example.com
```
If left unset, leads are accepted but only logged server‑side.

> If you want SMS alerts via Twilio, set `LEAD_WEBHOOK_URL` to your existing Render/Twilio webhook endpoint (POST JSON).

## Deploy
- **Vercel**: Import the repo and add `LEAD_WEBHOOK_URL` in Project → Settings → Environment Variables.
- **Netlify**: Use Next adapter or their Next support; set env variables.
- **Render**: Build command `npm run build`, start `npm start`.

## Customize
- Replace `/public/placeholder.jpg` with your project photos.
- Update copy in `app/about/page.tsx`, `app/learn/*`.
- Adjust pricing ranges in `components/Estimator.tsx`.
- Add logos/social links in `app/layout.tsx` schema JSON‑LD.

## License
All code here is yours to use for Stone & Resin.
