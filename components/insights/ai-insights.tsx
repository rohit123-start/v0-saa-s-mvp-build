"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles, Loader2, AlertCircle } from "lucide-react"
import { EmployeeInsights } from "./employee-insights"
import { ManagerInsights } from "./manager-insights"
import { mockUsers, mockTasks, type User } from "@/lib/mock-data"

export function AIInsights() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [insights, setInsights] = useState<string | null>(null)
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const mockUser = localStorage.getItem("mockUser")
    if (mockUser) {
      const userData = JSON.parse(mockUser)
      // This fixes the bug where manager@company.com wasn't being recognized as manager
      const user: User = {
        id: userData.role === "manager" ? "user-4" : "user-1",
        email: userData.email,
        name: userData.name || userData.email.split("@")[0],
        role: userData.role,
        organizationId: "org-1",
      }
      setCurrentUser(user)
    }
  }, [])

  const handleGenerateInsights = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser?.id,
          role: currentUser?.role,
          tasks: mockTasks,
          users: mockUsers,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate insights")
      }

      const data = await response.json()

      setInsights(data.insights)
      if (data.teamMembers) {
        setTeamMembers(data.teamMembers)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Loading user information...</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Generate AI Insights
          </CardTitle>
          <CardDescription>
            {currentUser.role === "employee"
              ? "Get personalized insights about your tasks for today and overall progress"
              : "Get team summaries and performance insights for weekly and monthly periods"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button onClick={handleGenerateInsights} disabled={loading} size="lg" className="gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Insights
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground">Click to consume AI tokens and generate insights</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {insights && (
        <>
          {currentUser.role === "employee" ? (
            <EmployeeInsights insights={insights} tasks={mockTasks.filter((t) => t.employeeId === currentUser.id)} />
          ) : (
            <ManagerInsights insights={insights} users={mockUsers} tasks={mockTasks} teamMembers={teamMembers} />
          )}
        </>
      )}
    </div>
  )
}
