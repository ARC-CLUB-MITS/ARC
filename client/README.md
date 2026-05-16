# ARC Club Website

Frontend for the ARC Club website. The app presents the club landing page, process sections, events archive, and project showcase.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- GSAP
- React Router

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
client/
  components/   Reusable page sections and shared UI
  pages/        Routed pages for Home, Events, and Projects
  public/       Static images and icons
  App.tsx       Route shell and launch screen gating
  index.tsx     React entry point
  index.css     Tailwind import and global CSS variables
```

## Routes

- `/` - Landing page
- `/home` - Landing page alias
- `/projects` - Project showcase
- `/events` - Events and completed archive

## Notes

- The first visit shows the launch screen and stores `arc_launched` in local storage.
- Vercel rewrites all routes to `index.html` through `vercel.json`.
- Motion-heavy sections use GSAP and include reduced-motion guards where recently updated.
