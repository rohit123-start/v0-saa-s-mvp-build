"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, TrendingUp, Sparkles, BookOpen, Mountain, Users } from "lucide-react"
import type { Entry } from "@/lib/mock-data"
import { format } from "date-fns"

interface EmployeeInsightsProps {
  insights: string
  entries: Entry[]
}

const moodIcons = {
  productive: Sparkles,
  learning: BookOpen,
  challenging: Mountain,
  collaborative: Users,
}

export function EmployeeInsights({ insights, entries }: EmployeeInsightsProps) {
  const today = format(new Date(), "yyyy-MM-dd")
  const todayEntries = entries.filter((e) => e.date === today)

  const moodCounts = entries.reduce(
    (acc, entry) => {
      acc[entry.mood]++
      return acc
    },
    { productive: 0, learning: 0, challenging: 0, collaborative: 0 } as Record<Entry["mood"], number>,
  )

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4 text-primary" />
            Today's Entries
          </CardTitle>
          <CardDescription>What you logged today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayEntries.length > 0 ? (
              <div className="space-y-3">
                {todayEntries.map((entry) => {
                  const MoodIcon = moodIcons[entry.mood]
                  return (
                    <div key={entry.id} className="rounded-lg border border-border/60 p-3">
                      <div className="flex items-start gap-2">
                        <MoodIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">{entry.title}</div>
                          {entry.description && (
                            <div className="text-xs text-muted-foreground mt-1">{entry.description}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No entries logged today yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-primary" />
            Work Patterns
          </CardTitle>
          <CardDescription>How your work has felt lately</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--mood-productive)]/10">
              <span className="text-sm flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[var(--mood-productive)]" />
                Productive days
              </span>
              <span className="font-medium">{moodCounts.productive}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--mood-learning)]/10">
              <span className="text-sm flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-[var(--mood-learning)]" />
                Learning days
              </span>
              <span className="font-medium">{moodCounts.learning}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--mood-challenging)]/10">
              <span className="text-sm flex items-center gap-2">
                <Mountain className="h-3.5 w-3.5 text-[var(--mood-challenging)]" />
                Challenging days
              </span>
              <span className="font-medium">{moodCounts.challenging}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--mood-collaborative)]/10">
              <span className="text-sm flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-[var(--mood-collaborative)]" />
                Collaborative days
              </span>
              <span className="font-medium">{moodCounts.collaborative}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Reflections
          </CardTitle>
          <CardDescription>Qualitative insights about your work patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">{insights}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
