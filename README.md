# QA or the Highway - Conference Website

A modern, static conference website built with Astro, React, and Tailwind CSS, designed to be deployed on GitHub Pages.

## Features

- 🚀 **Static Site Generation** with Astro
- ⚛️ **React Components** for interactive elements
- 🎨 **Tailwind CSS** for styling
- 📅 **Sessionize Integration** for speaker and session data
- 🤖 **Automated Data Fetching** via GitHub Actions
- 📦 **GitHub Pages Deployment**

## Project Structure

```
/
├── .github/
│   └── workflows/
│       ├── deploy.yml                 # GitHub Pages deployment
│       └── fetch-sessionize-data.yml  # Sessionize API data fetching
├── public/                            # Static assets
├── src/
│   ├── components/                    # Reusable Astro/React components
│   │   ├── Hero.astro
│   │   ├── SpeakerCard.astro
│   │   ├── Tickets.astro
│   │   ├── Sponsors.astro
│   │   └── Footer.astro
│   ├── data/
│   │   └── sessionize.json           # Sessionize API data (auto-updated)
│   ├── layouts/
│   │   └── Layout.astro              # Base page layout
│   ├── pages/
│   │   └── index.astro               # Home page
│   └── styles/
│       └── global.css                # Global styles with Tailwind
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:4321 in your browser

## Sessionize Integration

### Setup

1. Get your Sessionize event ID from your Sessionize dashboard
2. Add it as a GitHub secret named `SESSIONIZE_EVENT_ID`
3. The GitHub Action will automatically fetch data daily and on every push to main

### API Endpoints Used

- `/view/All` - Fetches all speakers, sessions, and schedule data

### Data Structure

The Sessionize data is stored in `src/data/sessionize.json` and includes:
- Speakers with profiles and bios
- Sessions with descriptions and schedules
- Categories and tags
- Room assignments

## Deployment

### GitHub Pages Setup

1. Go to your repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to the `main` branch to trigger deployment

### Custom Domain

To use a custom domain (like qaorthehwy.com):

1. Add a CNAME file to the `public/` directory with your domain
2. Configure DNS with your domain provider
3. Update the `site` field in `astro.config.mjs`

## Commands

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Install dependencies                             |
| `npm run dev`          | Start dev server at `localhost:4321`             |
| `npm run build`        | Build production site to `./dist/`               |
| `npm run preview`      | Preview build locally before deploying           |

## Customization

### Conference Data

Edit the conference details in `src/pages/index.astro`:

```typescript
const conferenceData = {
  date: 'TBD 2026',
  location: 'Columbus, OH',
  description: 'Your conference description',
};
```

### Ticket Tiers

Modify ticket information in `src/pages/index.astro`:

```typescript
const ticketTiers = [
  {
    name: 'Early Bird',
    price: '$299',
    available: true,
    features: [...],
  },
];
```

### Styling

- Global styles: `src/styles/global.css`
- Tailwind theme: Customize in `@theme` directive in global.css
- Component styles: Use Tailwind utility classes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this template for your own conference!
