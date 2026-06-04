# works-portal

Personal works portal built with React + TypeScript + Vite.

- `/`: project list homepage
- `/skills/`: skill index generated from local Claude/Codex skill folders

## Commands

```bash
npm run sync:skills
npm run dev
npm run build
```

`npm run sync:skills` scans local skill directories and regenerates `src/data/skills.generated.ts` for the `/skills/` page.
