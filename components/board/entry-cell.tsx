"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EntryCard } from "./entry-card"
import { AddEntryDialog } from "./add-entry-dialog"
import type { Entry, User } from "@/lib/mock-data"
import { canEditTask, isManager } from "@/lib/auth"

interface EntryCellProps {
  date: Date
  dateRange?: { start: Date; end: Date }
  employeeId: string
  entries: Entry[]
  currentUser: User | null
  onAddEntry: (entry: Omit<Entry, "id" | "createdAt" | "updatedAt">) => void
  onUpdateEntry: (entryId: string, updates: Partial<Entry>) => void
  onDeleteEntry: (entryId: string) => void
  onEntryClick: (entry: Entry) => void
}

export function EntryCell({ date, entries, currentUser, employeeId, onAddEntry, onEntryClick }: EntryCellProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const canEdit = currentUser ? canEditTask(currentUser, employeeId) : false
  const isManagerRole = isManager(currentUser)

  const handleAddEntry = (entryData: { title: string; description?: string; mood: Entry["mood"] }) => {
    onAddEntry({
      ...entryData,
      date: format(date, "yyyy-MM-dd"),
      employeeId,
    })
    setIsAddDialogOpen(false)
  }

  return (
    <div className="min-h-28 space-y-2">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} onClick={() => onEntryClick(entry)} />
      ))}

      {canEdit && !isManagerRole && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-8 border border-dashed border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add entry
          </Button>

          <AddEntryDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSave={handleAddEntry} />
        </>
      )}
    </div>
  )
}
