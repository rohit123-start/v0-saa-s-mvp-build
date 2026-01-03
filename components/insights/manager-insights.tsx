"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, AlertTriangle, Sparkles } from "lucide-react"
import type { Task, User } from "@/lib/mock-data"
import { startOfWeek, startOfMonth, format } from "date-fns"

interface ManagerInsightsProps {
  insights: string
  users: User[]
  tasks: Task[]
}

export function ManagerInsights({ insights, users, tasks }: ManagerInsightsProps) {
  const employees = users.filter((u) => u.role === "employee")

  const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd")
  const monthStart = format(startOfMonth(new Date()), "yyyy-MM-dd")

  const weeklyTasks = tasks.filter((t) => t.date >= weekStart)
  const monthlyTasks = tasks.filter((t) => t.date >= monthStart)

  const getStatusCounts = (taskList: Task[]) => {
    return taskList.reduce(
      (acc, task) => {
        acc[task.status]++
        return acc
      },
      { planned: 0, done: 0, blocked: 0 } as Record<Task["status"], number>,
    )
  }

  const weeklyStats = getStatusCounts(weeklyTasks)
  const monthlyStats = getStatusCounts(monthlyTasks)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Size
            </CardTitle>
            <CardDescription>Active employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{employees.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              This Week
            </CardTitle>
            <CardDescription>Weekly task summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Done:</span>
                <span className="font-semibold">{weeklyStats.done}</span>
              </div>
              <div className="flex justify-between">
                <span>Planned:</span>
                <span className="font-semibold">{weeklyStats.planned}</span>
              </div>
              <div className="flex justify-between">
                <span>Blocked:</span>
                <span className="font-semibold">{weeklyStats.blocked}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              This Month
            </CardTitle>
            <CardDescription>Monthly task summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Done:</span>
                <span className="font-semibold">{monthlyStats.done}</span>
              </div>
              <div className="flex justify-between">
                <span>Planned:</span>
                <span className="font-semibold">{monthlyStats.planned}</span>
              </div>
              <div className="flex justify-between">
                <span>Blocked:</span>
                <span className="font-semibold">{monthlyStats.blocked}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Team Analysis
          </CardTitle>
          <CardDescription>AI-generated insights for team performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{insights}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Employee Activity</CardTitle>
          <CardDescription>Task distribution across team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {employees.map((employee) => {
              const employeeTasks = monthlyTasks.filter((t) => t.employeeId === employee.id)
              const employeeStats = getStatusCounts(employeeTasks)
              return (
                <div key={employee.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-xs text-muted-foreground">{employee.email}</div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-[var(--status-done)]">✓ {employeeStats.done}</span>
                    <span className="text-[var(--status-planned)]">◯ {employeeStats.planned}</span>
                    <span className="text-[var(--status-blocked)]">⚠ {employeeStats.blocked}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
