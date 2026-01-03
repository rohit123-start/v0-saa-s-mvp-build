import { WorkBoard } from "@/components/board/work-board"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Work Board</h1>
        <p className="text-muted-foreground">Track your team's tasks across time</p>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Board Permissions</AlertTitle>
        <AlertDescription>
          Everyone can view all tasks. Employees can add and edit only their own tasks. Managers have read-only access
          to support the team.
        </AlertDescription>
      </Alert>

      <WorkBoard />
    </div>
  )
}
