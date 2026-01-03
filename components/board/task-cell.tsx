"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskCard } from "./task-card"
import { TaskDialog } from "./task-dialog"
import type { Task, User } from "@/lib/mock-data"
import { canEditTask, isManager } from "@/lib/auth"

interface TaskCellProps {
  date: Date
  dateRange?: { start: Date; end: Date }
  employeeId: string
  tasks: Task[]
  currentUser: User | null
  onAddTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onDeleteTask: (taskId: string) => void
}

export function TaskCell({
  date,
  dateRange,
  employeeId,
  tasks,
  currentUser,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: TaskCellProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const canEdit = currentUser ? canEditTask(currentUser, employeeId) : false
  const isManagerRole = isManager(currentUser)

  const handleAddTask = (taskData: { title: string; description?: string; status: Task["status"] }) => {
    onAddTask({
      ...taskData,
      date: format(date, "yyyy-MM-dd"),
      employeeId,
    })
    setIsAddDialogOpen(false)
  }

  return (
    <div className="min-h-24 space-y-2">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          canEdit={canEdit}
          isManager={isManagerRole}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}

      {canEdit && !isManagerRole && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-8 border-2 border-dashed text-muted-foreground hover:text-foreground hover:border-primary"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>

          <TaskDialog
            open={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            onSave={handleAddTask}
            title="Add Task"
            defaultDate={format(date, "yyyy-MM-dd")}
          />
        </>
      )}
    </div>
  )
}
