# TVK Palayamkottai Connect

A React web application for **Tamizhaga Vettri Kazhagam (TVK)** — **Palayamkottai** (பாலையங்கோட்டை) district office. Every household in Palayamkottai can register and submit complaints with photo/document uploads.

## Features

- **House Registration** — Register each household with address, ward, district, and family details
- **Complaint Submission** — File grievances by category (water, roads, electricity, health, etc.) with photo/PDF attachments
- **Complaint Dashboard** — Track status of submitted complaints (pending, in progress, resolved)
- **Bilingual UI** — English and Tamil labels throughout
- **TVK Branding** — Party colors and district portal design

## Tech Stack

- React 19 + TypeScript
- Vite 6
- React Router 7
- Tailwind CSS 4
- LocalStorage for data persistence (ready for backend integration)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Live Site

**One-time setup required** — see [ENABLE-LIVE-SITE.md](ENABLE-LIVE-SITE.md)

After enabling GitHub Pages, your site will be at:

**https://joshuadev-creator.github.io/District-Connect/**

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — overview and quick actions |
| `/register` | House registration form |
| `/complaint` | Submit a new complaint with uploads |
| `/dashboard` | View and track your complaints |

## Data Storage

Data is currently stored in the browser's `localStorage`. For production deployment, connect a backend API by replacing functions in `src/lib/storage.ts`.

## License

Private — TVK District Office use.
