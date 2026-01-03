import { AIInsights } from "@/components/insights/ai-insights"

export default function InsightsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Insights</h1>
        <p className="text-muted-foreground mt-1">
          AI-generated reflections and patterns from your work journal entries
        </p>
      </div>
      <AIInsights />
    </div>
  )
}
