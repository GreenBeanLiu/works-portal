import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { projects, type Project } from '@/data/projects'

const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  wip: 'WIP',
  archived: 'Archived',
}

const statusStyle: Record<Project['status'], string> = {
  live: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800',
  wip: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800',
  archived: 'bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700',
}

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort()

export default function App() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Works</h1>
          <p className="mt-2 text-muted-foreground">个人项目总览</p>
        </header>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
              activeTag === null
                ? 'bg-foreground text-background border-foreground'
                : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                activeTag === tag
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <Card
              key={project.name}
              className="flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-medium font-mono">
                    {project.name}
                  </CardTitle>
                  <span
                    className={`shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${statusStyle[project.status]}`}
                  >
                    {statusLabel[project.status]}
                  </span>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-2"
                  >
                    访问 →
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          {projects.length} projects
        </footer>
      </div>
    </div>
  )
}
