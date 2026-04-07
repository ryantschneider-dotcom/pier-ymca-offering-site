# 144 Scranton Connector — Investment Offering Site

Public-facing buyer offering website for **144 Scranton Connector, Brunswick, GA 31525**.

Built with React 19 + Vite + Tailwind CSS 4. Hosted at [ymca.piercommercial.com](https://ymca.piercommercial.com).

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Copy env file and add your Google Maps API key
cp .env.example .env

# Start dev server
pnpm dev
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GOOGLE_MAPS_API_KEY` | Yes | Google Maps JavaScript API key for the interactive location map |

Get a key at [Google Cloud Console](https://console.cloud.google.com/). Enable the **Maps JavaScript API** and restrict the key to your domain.

---

## Build & Deploy

```bash
# Build for production
pnpm build
# Output is in /dist — deploy that folder to any static host
```

### Netlify
1. Connect repo → Build command: `pnpm build` → Publish directory: `dist`
2. Add `VITE_GOOGLE_MAPS_API_KEY` in Site Settings → Environment Variables

### Vercel
1. Import repo → Framework: Vite → Output directory: `dist`
2. Add `VITE_GOOGLE_MAPS_API_KEY` in Project Settings → Environment Variables

### GitHub Pages
```bash
pnpm build
# Deploy /dist contents to gh-pages branch
```

---

## Project Structure

```
client/
  src/
    pages/Home.tsx        ← Main offering page (all sections)
    components/Map.tsx    ← Google Maps integration
    components/ui/        ← shadcn/ui components
    index.css             ← Global styles + Tailwind tokens
server/                   ← Placeholder (not used — static site)
shared/                   ← Shared types
vite.config.ts            ← Build configuration
```

---

## Sections

| Section | Description |
|---|---|
| Overview | Hero aerial, key stats, CTA buttons |
| Property | Site description, improvements, value narrative |
| Zoning | MR District analysis, permitted uses |
| Market | Brunswick/Glynn County market context |
| Location | Interactive Google Map |
| Contact | Request information form |

---

## Branding

- **Primary color:** `#CB521E` (PIER orange)
- **Logo:** `Brokeragetransp.png` (transparent PNG, orange on transparent — no CSS filters)
- **Agent:** Ryan T. Schneider, CCIM | ryan@piercommercial.com | 912-239-6298

---

*PIER Commercial Real Estate — Savannah, GA | piercommercial.com*
