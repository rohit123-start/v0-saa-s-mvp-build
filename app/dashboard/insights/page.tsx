import { AIInsights } from "@/components/insights/ai-insights"

export default function InsightsPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
        <p className="text-muted-foreground">Get AI-powered insights about your work and team performance</p>
      </div>
      <AIInsights />
    </div>
  )
}
