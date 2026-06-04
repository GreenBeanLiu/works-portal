# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run sync:skills  # regenerate src/data/skills.generated.ts from ~/.claude/skills and ~/.codex/skills
npm run dev      # dev server at localhost:5173
npm run build    # tsc type-check + vite build → dist/
npm run lint     # eslint
```

## Architecture

Multi-page static site.

- `/` entry: `src/main.tsx` → `src/App.tsx`
- `/skills/` entry: `skills/index.html` → `src/skills-main.tsx` → `src/SkillsPage.tsx`

**Data layer**: `scripts/generate-skills-data.mjs` reads from:
- `~/.claude/skills`
- `~/.codex/skills`
- `~/.codex/skills/.system`

It writes `src/data/skills.generated.ts`, which is the only data file the frontend imports. Do not hand-edit the generated file.

**Homepage data**: `src/data/projects.ts`

**Skills data**: `scripts/generate-skills-data.mjs` reads from:
- `~/.claude/skills`
- `~/.codex/skills`
- `~/.codex/skills/.system`

It writes `src/data/skills.generated.ts`, which is only used by the `/skills/` page.

**UI**: homepage project grid lives in `src/App.tsx`; skills directory UI lives in `src/SkillsPage.tsx`. shadcn/ui components (`Badge`, `Card`) live in `src/components/ui/`. Path alias `@/` maps to `src/`.

## Deployment

Deployed on Cloudflare Pages, connected to `GreenBeanLiu/works-portal` on GitHub. Push to `main` triggers auto-deploy. Build command: `npm run build`, output dir: `dist`.
