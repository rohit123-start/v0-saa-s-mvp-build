import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId, role, tasks, users } = await request.json()

    const dummyInsights =
      role === "employee"
        ? `Great focus today! You have 3 tasks planned, and you've already completed 2 of them. Your consistent progress on the analytics dashboard shows strong momentum.

Overall, you're maintaining excellent balance with 12 completed tasks, 5 planned, and 2 blocked items this month. Consider addressing the blocked tasks early next week to keep your workflow smooth. Your steady completion rate demonstrates reliable productivity patterns.`
        : `The team is showing strong collaboration this week with 24 completed tasks across ${users.filter((u: { role: string }) => u.role === "employee").length} team members. Progress is steady with only 3 blocked items that may need attention.

Monthly metrics indicate healthy team velocity with 89 completed tasks and 15 currently in progress. The 3 blocked items appear to be concentrated around integration work - consider a quick sync to unblock these collaboratively.

Team engagement is high with consistent daily contributions. Focus on supporting the blocked items to maintain momentum and ensure everyone has clear paths forward.`

    const teamMembers =
      role === "manager"
        ? [
            {
              id: "1",
              name: "Sarah Johnson",
              email: "sarah@company.com",
              totalTasks: 8,
              completed: 5,
              planned: 2,
              blocked: 1,
              recentTasks: [
                {
                  title: "Complete user authentication flow",
                  description: "Implement JWT-based auth with refresh tokens",
                  status: "done",
                  date: "2026-01-03",
                },
                {
                  title: "Design database schema for user profiles",
                  description: "Create ERD and migration files",
                  status: "done",
                  date: "2026-01-02",
                },
                {
                  title: "Fix login form validation",
                  description: "Add proper error handling and feedback",
                  status: "planned",
                  date: "2026-01-04",
                },
                {
                  title: "Write API documentation",
                  description: "Document all authentication endpoints",
                  status: "planned",
                  date: "2026-01-05",
                },
                {
                  title: "Setup OAuth integration",
                  description: "Waiting for third-party API access",
                  status: "blocked",
                  date: "2026-01-06",
                },
              ],
            },
            {
              id: "2",
              name: "Michael Chen",
              email: "michael@company.com",
              totalTasks: 12,
              completed: 8,
              planned: 3,
              blocked: 1,
              recentTasks: [
                {
                  title: "Build dashboard analytics component",
                  description: "Create charts for user metrics",
                  status: "done",
                  date: "2026-01-03",
                },
                {
                  title: "Implement data export feature",
                  description: "Allow CSV and JSON export of reports",
                  status: "done",
                  date: "2026-01-02",
                },
                {
                  title: "Optimize database queries",
                  description: "Add indexes and improve query performance",
                  status: "done",
                  date: "2026-01-01",
                },
                {
                  title: "Create notification system",
                  description: "Real-time alerts for important events",
                  status: "planned",
                  date: "2026-01-05",
                },
                {
                  title: "Integrate payment gateway",
                  description: "Waiting for legal approval on payment terms",
                  status: "blocked",
                  date: "2026-01-07",
                },
              ],
            },
            {
              id: "3",
              name: "Emily Rodriguez",
              email: "emily@company.com",
              totalTasks: 6,
              completed: 4,
              planned: 2,
              blocked: 0,
              recentTasks: [
                {
                  title: "Design landing page mockups",
                  description: "Create high-fidelity designs in Figma",
                  status: "done",
                  date: "2026-01-03",
                },
                {
                  title: "Build responsive navigation menu",
                  description: "Mobile-first design with smooth transitions",
                  status: "done",
                  date: "2026-01-02",
                },
                {
                  title: "Implement dark mode toggle",
                  description: "Add theme switching with user preference persistence",
                  status: "planned",
                  date: "2026-01-04",
                },
                {
                  title: "Optimize images for web",
                  description: "Compress and convert to WebP format",
                  status: "planned",
                  date: "2026-01-06",
                },
                {
                  title: "Create component library documentation",
                  description: "Storybook setup with usage examples",
                  status: "done",
                  date: "2025-12-30",
                },
              ],
            },
            {
              id: "4",
              name: "David Park",
              email: "david@company.com",
              totalTasks: 10,
              completed: 6,
              planned: 3,
              blocked: 1,
              recentTasks: [
                {
                  title: "Setup CI/CD pipeline",
                  description: "Configure GitHub Actions for automated deployment",
                  status: "done",
                  date: "2026-01-03",
                },
                {
                  title: "Implement error tracking",
                  description: "Integrate Sentry for error monitoring",
                  status: "done",
                  date: "2026-01-01",
                },
                {
                  title: "Configure monitoring alerts",
                  description: "Setup uptime and performance alerts",
                  status: "planned",
                  date: "2026-01-04",
                },
                {
                  title: "Upgrade to latest Next.js version",
                  description: "Migrate to Next.js 16 and test all features",
                  status: "planned",
                  date: "2026-01-07",
                },
                {
                  title: "Setup load balancer",
                  description: "Waiting for infrastructure budget approval",
                  status: "blocked",
                  date: "2026-01-08",
                },
              ],
            },
          ]
        : undefined

    return NextResponse.json({ insights: dummyInsights, teamMembers })
  } catch (error) {
    console.error("[v0] AI Insights error:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}

// Real AI implementation (commented out for now)
// Uncomment this code and remove the dummy insights above to use actual AI generation
/*
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
*/
