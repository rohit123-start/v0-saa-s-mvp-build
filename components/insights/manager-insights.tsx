"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Activity, Sparkles, BookOpen, Mountain } from "lucide-react"
import type { Entry, User } from "@/lib/mock-data"
import { startOfWeek, startOfMonth, format } from "date-fns"

interface ManagerInsightsProps {
  insights: string
  users: User[]
  entries: Entry[]
  teamMembers?: Array<{
    id: string
    name: string
    email: string
    totalEntries: number
    moodCounts: Record<string, number>
    recentEntries: Array<{
      title: string
      description: string
      mood: string
      date: string
      reflection?: string
    }>
  }>
}

const moodIcons: Record<string, any> = {
  productive: Sparkles,
  learning: BookOpen,
  challenging: Mountain,
  collaborative: Users,
}

export function ManagerInsights({ insights, users, entries, teamMembers }: ManagerInsightsProps) {
  const employees = users.filter((u) => u.role === "employee")

  const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd")
  const monthStart = format(startOfMonth(new Date()), "yyyy-MM-dd")

  const weeklyEntries = entries.filter((e) => e.date >= weekStart)
  const monthlyEntries = entries.filter((e) => e.date >= monthStart)

  const getMoodCounts = (entryList: Entry[]) => {
    return entryList.reduce(
      (acc, entry) => {
        acc[entry.mood]++
        return acc
      },
      { productive: 0, learning: 0, challenging: 0, collaborative: 0 } as Record<Entry["mood"], number>,
    )
  }

  const weeklyMoods = getMoodCounts(weeklyEntries)
  const monthlyMoods = getMoodCounts(monthlyEntries)

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="bg-muted/50">
        <TabsTrigger value="overview" className="data-[state=active]:bg-card">
          Overview
        </TabsTrigger>
        <TabsTrigger value="team-members" className="data-[state=active]:bg-card">
          Team Members
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-primary" />
                Team Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{employees.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active team members</p>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-primary" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{weeklyEntries.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Work log entries</p>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4 text-primary" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{monthlyEntries.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Work log entries</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" />
              AI Team Summary
            </CardTitle>
            <CardDescription>Qualitative insights about team work patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">{insights}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Team Mood Patterns</CardTitle>
            <CardDescription>How the team's work has felt this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              {Object.entries(monthlyMoods).map(([mood, count]) => {
                const Icon = moodIcons[mood]
                return (
                  <div key={mood} className={`p-4 rounded-lg bg-[var(--mood-${mood})]/10 text-center`}>
                    <Icon className={`h-5 w-5 mx-auto mb-2 text-[var(--mood-${mood})]`} />
                    <div className="text-2xl font-semibold">{count}</div>
                    <div className="text-xs text-muted-foreground capitalize">{mood}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="team-members" className="space-y-6">
        {teamMembers && teamMembers.length > 0 ? (
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <Card key={member.id} className="border-border/60">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {member.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <CardTitle className="text-base">{member.name}</CardTitle>
                        <CardDescription>{member.email}</CardDescription>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{member.totalEntries} entries</div>
                  </div>
                </CardHeader>
                <CardContent>
                  {member.recentEntries.length > 0 ? (
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-muted-foreground">Recent Work:</div>
                      {member.recentEntries.map((entry: any, idx: number) => {
                        const Icon = moodIcons[entry.mood] || Sparkles
                        return (
                          <div key={idx} className="flex items-start gap-3 rounded-lg border border-border/60 p-3">
                            <Icon className={`h-4 w-4 mt-0.5 text-[var(--mood-${entry.mood})]`} />
                            <div className="flex-1">
                              <div className="font-medium text-sm">{entry.title}</div>
                              {entry.description && (
                                <div className="mt-1 text-sm text-muted-foreground">{entry.description}</div>
                              )}
                              {entry.reflection && (
                                <div className="mt-2 text-sm italic text-foreground/60 bg-muted/50 p-2 rounded">
                                  "{entry.reflection}"
                                </div>
                              )}
                              <div className="mt-2 text-xs text-muted-foreground">
                                {format(new Date(entry.date), "MMM d, yyyy")}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">No entries yet</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {employees.map((employee) => {
              const employeeEntries = entries.filter((e) => e.employeeId === employee.id)
              const recentEntries = employeeEntries.slice(0, 5)

              return (
                <Card key={employee.id} className="border-border/60">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <CardTitle className="text-base">{employee.name}</CardTitle>
                          <CardDescription>{employee.email}</CardDescription>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{employeeEntries.length} entries</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {recentEntries.length > 0 ? (
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-muted-foreground">Recent Work:</div>
                        {recentEntries.map((entry) => {
                          const Icon = moodIcons[entry.mood]
                          return (
                            <div
                              key={entry.id}
                              className="flex items-start gap-3 rounded-lg border border-border/60 p-3"
                            >
                              <Icon className={`h-4 w-4 mt-0.5 text-[var(--mood-${entry.mood})]`} />
                              <div className="flex-1">
                                <div className="font-medium text-sm">{entry.title}</div>
                                {entry.description && (
                                  <div className="mt-1 text-sm text-muted-foreground">{entry.description}</div>
                                )}
                                {entry.reflection && (
                                  <div className="mt-2 text-sm italic text-foreground/60 bg-muted/50 p-2 rounded">
                                    "{entry.reflection}"
                                  </div>
                                )}
                                <div className="mt-2 text-xs text-muted-foreground">
                                  {format(new Date(entry.date), "MMM d, yyyy")}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">No entries yet</div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
