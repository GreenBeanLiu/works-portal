import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { allSkills, skillSources, type SkillRecord } from '@/data/skills.generated'

const sourceStyles: Record<string, string> = {
  claude: 'bg-orange-100 text-orange-900 border-orange-300',
  'codex-user': 'bg-sky-100 text-sky-900 border-sky-300',
  'codex-system': 'bg-zinc-200 text-zinc-800 border-zinc-300',
}

export default function SkillsPage() {
  const [activeSource, setActiveSource] = useState<string | null>(null)

  const visibleSkills = useMemo(() => {
    const base = activeSource ? allSkills.filter((skill) => skill.sourceId === activeSource) : allSkills
    return [...base].sort((a, b) => a.name.localeCompare(b.name))
  }, [activeSource])

  const totals = {
    skills: allSkills.length,
    references: allSkills.reduce((sum, skill) => sum + skill.referencesCount, 0),
    scripts: allSkills.reduce((sum, skill) => sum + skill.scriptsCount, 0),
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_24%),linear-gradient(180deg,_#fffdf8_0%,_#f8f4ea_48%,_#efe7d8_100%)] text-foreground">
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
        <section className="overflow-hidden rounded-[2rem] border border-stone-300/80 bg-white/70 shadow-[0_20px_80px_rgba(92,65,32,0.10)] backdrop-blur">
          <div className="border-b border-stone-200/80 px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
                  Personal Skill Index
                </p>
                <h1 className="font-heading text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
                  Claude and Codex skills, without the plugin noise.
                </h1>
                <p className="mt-4 text-base leading-7 text-stone-600 md:text-lg">
                  This page is generated from <code>~/.claude/skills</code> and <code>~/.codex/skills</code>.
                  It excludes marketplace and cache bundles, so the list stays focused on the skills you actually maintain.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <MetricCard label="Skills" value={totals.skills} />
                <MetricCard label="Refs" value={totals.references} />
                <MetricCard label="Scripts" value={totals.scripts} />
              </div>
            </div>
          </div>

          <div className="px-6 py-6 md:px-10">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/"
                className="mr-2 text-sm text-stone-500 transition-colors hover:text-stone-900"
              >
                ← 返回首页
              </a>
              <FilterChip
                active={activeSource === null}
                label={`All · ${allSkills.length}`}
                onClick={() => setActiveSource(null)}
              />
              {skillSources.map((source) => (
                <FilterChip
                  key={source.id}
                  active={activeSource === source.id}
                  label={`${source.label} · ${source.count}`}
                  onClick={() => setActiveSource(source.id === activeSource ? null : source.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {visibleSkills.map((skill) => (
              <SkillCard key={`${skill.sourceId}:${skill.name}`} skill={skill} />
            ))}
          </div>

          <aside className="space-y-4">
            {skillSources.map((source) => (
              <Card key={source.id} className="border-stone-300/80 bg-white/80 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base text-stone-900">{source.label}</CardTitle>
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${sourceStyles[source.id]}`}>
                      {source.type}
                    </span>
                  </div>
                  <CardDescription className="font-mono text-xs text-stone-500">
                    {source.root}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-stone-600">
                  <p>{source.count} skills indexed.</p>
                  <div className="flex flex-wrap gap-2">
                    {source.skills.map((skill) => (
                      <Badge key={`${source.id}:${skill.name}`} variant="secondary" className="bg-stone-100 text-stone-700">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </aside>
        </section>
      </main>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.4rem] border border-stone-300/80 bg-stone-900 px-4 py-4 text-stone-50 shadow-sm">
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-300">{label}</div>
    </div>
  )
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        active
          ? 'border-stone-900 bg-stone-900 text-stone-50'
          : 'border-stone-300 bg-white/80 text-stone-600 hover:border-stone-500 hover:text-stone-900'
      }`}
    >
      {label}
    </button>
  )
}

function SkillCard({ skill }: { skill: SkillRecord }) {
  return (
    <Card className="border-stone-300/80 bg-white/85 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg text-stone-900">{skill.name}</CardTitle>
            <CardDescription className="mt-1 font-mono text-xs text-stone-500">
              {skill.skillPath}
            </CardDescription>
          </div>
          <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${sourceStyles[skill.sourceId]}`}>
            {skill.sourceLabel}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-stone-700">
          {skill.description || 'No description found in frontmatter.'}
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-stone-100 text-stone-700">
            folder: {skill.folder}
          </Badge>
          <Badge variant="secondary" className="bg-stone-100 text-stone-700">
            refs: {skill.referencesCount}
          </Badge>
          <Badge variant="secondary" className="bg-stone-100 text-stone-700">
            scripts: {skill.scriptsCount}
          </Badge>
          <Badge variant="secondary" className="bg-stone-100 text-stone-700">
            agents: {skill.agentsCount}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
