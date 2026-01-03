import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId, role, entries, users } = await request.json()

    const dummyInsights =
      role === "employee"
        ? `Your recent work reflects a healthy balance of focused productivity and collaborative moments. The pattern of learning-focused days earlier in the week followed by productive execution shows good rhythm.

Your reflection notes suggest you're building valuable skills through the dashboard project. The collaborative sessions have been particularly impactful based on your entries. Consider continuing to document your learnings - these reflections become valuable references over time.`
        : `The team is maintaining a healthy work rhythm with a good mix of focused work and collaborative sessions. Recent entries show strong engagement across all team members with thoughtful reflections being shared.

Sarah and Michael have been particularly active with detailed documentation of their work. Emily's learning-focused entries suggest growth opportunities that could benefit the wider team through knowledge sharing. David's infrastructure work has been steady and well-documented.

The overall team mood leans productive and collaborative, which indicates good team dynamics. Consider creating space for the team to share their learnings from challenging days - these often contain the most valuable insights.`

    const teamMembers =
      role === "manager"
        ? [
            {
              id: "1",
              name: "Sarah Johnson",
              email: "sarah@company.com",
              totalEntries: 8,
              moodCounts: { productive: 4, learning: 2, challenging: 1, collaborative: 1 },
              recentEntries: [
                {
                  title: "Completed user authentication flow",
                  description: "Implemented JWT-based auth with refresh tokens",
                  reflection: "This was more complex than expected but learned a lot about security best practices.",
                  mood: "productive",
                  date: "2026-01-03",
                },
                {
                  title: "Deep dive into database optimization",
                  description: "Studied query performance and indexing strategies",
                  reflection: "The performance gains were significant - 60% faster queries.",
                  mood: "learning",
                  date: "2026-01-02",
                },
                {
                  title: "Paired with Michael on API design",
                  description: "Collaborated on RESTful API structure for new features",
                  mood: "collaborative",
                  date: "2026-01-01",
                },
              ],
            },
            {
              id: "2",
              name: "Michael Chen",
              email: "michael@company.com",
              totalEntries: 12,
              moodCounts: { productive: 6, learning: 3, challenging: 2, collaborative: 1 },
              recentEntries: [
                {
                  title: "Built dashboard analytics component",
                  description: "Created interactive charts for user metrics visualization",
                  reflection: "Really happy with how the charts turned out. Users will love this.",
                  mood: "productive",
                  date: "2026-01-03",
                },
                {
                  title: "Debugging tricky state management issue",
                  description: "Spent hours tracking down a race condition",
                  reflection: "Frustrating but learned about React's concurrent features.",
                  mood: "challenging",
                  date: "2026-01-02",
                },
                {
                  title: "Implemented data export feature",
                  description: "Allow CSV and JSON export of reports",
                  mood: "productive",
                  date: "2026-01-01",
                },
              ],
            },
            {
              id: "3",
              name: "Emily Rodriguez",
              email: "emily@company.com",
              totalEntries: 6,
              moodCounts: { productive: 2, learning: 3, challenging: 0, collaborative: 1 },
              recentEntries: [
                {
                  title: "Explored new animation library",
                  description: "Tested Framer Motion for micro-interactions",
                  reflection: "This could really elevate our UI. Planning to propose it to the team.",
                  mood: "learning",
                  date: "2026-01-03",
                },
                {
                  title: "Designed landing page mockups",
                  description: "Created high-fidelity designs in Figma",
                  mood: "productive",
                  date: "2026-01-02",
                },
                {
                  title: "Design review with stakeholders",
                  description: "Presented new component library to product team",
                  reflection: "Great feedback! A few iterations needed but overall positive.",
                  mood: "collaborative",
                  date: "2026-01-01",
                },
              ],
            },
            {
              id: "4",
              name: "David Park",
              email: "david@company.com",
              totalEntries: 10,
              moodCounts: { productive: 5, learning: 2, challenging: 2, collaborative: 1 },
              recentEntries: [
                {
                  title: "Setup CI/CD pipeline",
                  description: "Configured GitHub Actions for automated deployment",
                  reflection: "Deployments are now 10x faster. Really proud of this work.",
                  mood: "productive",
                  date: "2026-01-03",
                },
                {
                  title: "Troubleshooting production issue",
                  description: "Memory leak causing service restarts",
                  reflection: "Stressful but good learning about Node.js memory management.",
                  mood: "challenging",
                  date: "2026-01-02",
                },
                {
                  title: "Learning Kubernetes fundamentals",
                  description: "Working through K8s documentation and tutorials",
                  mood: "learning",
                  date: "2026-01-01",
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
