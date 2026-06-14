import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { projects, type Project } from '@/data/projects'

const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  wip: 'In Progress',
  archived: 'Archived',
}

const statusStyle: Record<Project['status'], string> = {
  live:     'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/60',
  wip:      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/60',
  archived: 'bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-500 dark:border-zinc-800',
}

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort()

const liveCount = projects.filter((p) => p.status === 'live').length
const wipCount  = projects.filter((p) => p.status === 'wip').length

export default function App() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-14">

        {/* Header */}
        <header className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground shadow-sm">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4 text-background">
                <path d="M2 12L6 4l4 6 2-3 2 5"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">GreenBeanLiu</h1>
              <p className="text-xs text-muted-foreground">个人项目总览</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {liveCount} 上线
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              {wipCount} 开发中
            </span>
            <span className="text-muted-foreground/50">·</span>
            <span>{projects.length} 个项目</span>
          </div>
        </header>

        {/* Tag filters */}
        <div className="mb-8 flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeTag === null
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
            }`}
          >
            全部
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Card
              key={project.name}
              className="flex flex-col justify-between transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-mono text-[13px] font-medium leading-snug">
                    {project.name}
                  </CardTitle>
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${statusStyle[project.status]}`}>
                    {statusLabel[project.status]}
                  </span>
                </div>
                <CardDescription className="text-xs leading-relaxed mt-1">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between pt-0">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="ml-2 flex shrink-0 items-center gap-2">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="GitHub"
                    >
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                    </a>
                  )}
                  {project.url && (
                    <a
                      href={project.url}
                      target={project.url.startsWith('/') ? undefined : '_blank'}
                      rel={project.url.startsWith('/') ? undefined : 'noopener noreferrer'}
                      className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      访问 →
                    </a>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <footer className="mt-14 flex items-center justify-between text-xs text-muted-foreground/50">
          <span>© 2026 GreenBeanLiu</span>
          <span>{projects.length} projects</span>
        </footer>
      </div>
    </div>
  )
}
