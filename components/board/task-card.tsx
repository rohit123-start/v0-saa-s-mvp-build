"use client"

import { useState } from "react"
import { MoreVertical, Pencil, Trash, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TaskDialog } from "./task-dialog"
import { cn } from "@/lib/utils"
import type { Task } from "@/lib/mock-data"

interface TaskCardProps {
  task: Task
  canEdit: boolean
  isManager: boolean
  onUpdate: (taskId: string, updates: Partial<Task>) => void
  onDelete: (taskId: string) => void
}

const statusStyles = {
  planned: "bg-[var(--status-planned)] text-white",
  done: "bg-[var(--status-done)] text-white",
  blocked: "bg-[var(--status-blocked)] text-white",
}

export function TaskCard({ task, canEdit, isManager, onUpdate, onDelete }: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleUpdate = (data: { title: string; description?: string; status: Task["status"] }) => {
    onUpdate(task.id, data)
    setIsEditDialogOpen(false)
  }

  return (
    <>
      <div
        className={cn(
          "group relative rounded-md p-2 text-xs transition-all hover:shadow-sm",
          statusStyles[task.status],
        )}
      >
        <div className="font-medium line-clamp-2 pr-6">{task.title}</div>
        {task.description && <div className="mt-1 text-xs opacity-90 line-clamp-1">{task.description}</div>}

        {canEdit && !isManager ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-white/20"
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Pencil className="h-3 w-3 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive">
                <Trash className="h-3 w-3 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : isManager ? (
          <div className="absolute right-1 top-1 h-6 w-6 flex items-center justify-center opacity-0 group-hover:opacity-60">
            <Lock className="h-3 w-3" />
          </div>
        ) : null}
      </div>

      {canEdit && (
        <TaskDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleUpdate}
          title="Edit Task"
          initialData={task}
        />
      )}
    </>
  )
}
