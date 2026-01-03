import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { userId, role, tasks, users } = await request.json()

    const employees = users.filter((u: { role: string }) => u.role === "employee")
    const userTasks = tasks.filter((t: { employeeId: string }) => t.employeeId === userId)

    let prompt = ""

    if (role === "employee") {
      const today = new Date().toISOString().split("T")[0]
      const todayTasks = userTasks.filter((t: { date: string }) => t.date === today)

      const statusCounts = userTasks.reduce((acc: Record<string, number>, task: { status: string }) => {
        acc[task.status] = (acc[task.status] || 0) + 1
        return acc
      }, {})

      prompt = `You are an AI assistant providing helpful, non-judgmental insights to an employee about their work.

Today's Tasks: ${todayTasks.length} tasks
- ${todayTasks.map((t: { title: string; status: string }) => `${t.title} (${t.status})`).join(", ") || "None"}

Overall Statistics:
- Completed: ${statusCounts.done || 0}
- Planned: ${statusCounts.planned || 0}
- Blocked: ${statusCounts.blocked || 0}

Provide a brief, encouraging insight (2-3 sentences) about:
1. Their focus for today
2. Overall progress and any patterns

Keep it positive and actionable. Do not rank, compare, or surveil. Focus on personal growth.`
    } else {
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1)
      const weekStartStr = weekStart.toISOString().split("T")[0]

      const monthStart = new Date()
      monthStart.setDate(1)
      const monthStartStr = monthStart.toISOString().split("T")[0]

      const weeklyTasks = tasks.filter((t: { date: string }) => t.date >= weekStartStr)
      const monthlyTasks = tasks.filter((t: { date: string }) => t.date >= monthStartStr)

      const weeklyStats = weeklyTasks.reduce((acc: Record<string, number>, task: { status: string }) => {
        acc[task.status] = (acc[task.status] || 0) + 1
        return acc
      }, {})

      const monthlyStats = monthlyTasks.reduce((acc: Record<string, number>, task: { status: string }) => {
        acc[task.status] = (acc[task.status] || 0) + 1
        return acc
      }, {})

      prompt = `You are an AI assistant providing team insights to a manager. Focus on collaboration and support, not surveillance.

Team Size: ${employees.length} employees

Weekly Summary:
- Completed: ${weeklyStats.done || 0}
- Planned: ${weeklyStats.planned || 0}
- Blocked: ${weeklyStats.blocked || 0}

Monthly Summary:
- Completed: ${monthlyStats.done || 0}
- Planned: ${monthlyStats.planned || 0}
- Blocked: ${monthlyStats.blocked || 0}

Provide a brief, constructive team insight (3-4 sentences) about:
1. Team progress this week/month
2. Any patterns or blockers to address
3. Suggestions for team support

Focus on enabling the team, not ranking individuals. Emphasize collaboration and removing obstacles.`
    }

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
    })

    return NextResponse.json({ insights: text })
  } catch (error) {
    console.error("[v0] AI Insights error:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
