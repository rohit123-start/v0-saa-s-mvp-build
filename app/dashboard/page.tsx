import { WorkBoard } from "@/components/board/work-board"

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Work Journal</h1>
        <p className="text-muted-foreground mt-1">A shared space for the team to log and reflect on their work</p>
      </div>

      <WorkBoard />
    </div>
  )
}
