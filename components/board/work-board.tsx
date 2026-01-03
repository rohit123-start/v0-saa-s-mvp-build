"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BoardView } from "./board-view"
import { mockUsers, mockEntries, type Entry, type User } from "@/lib/mock-data"
import { addWeeks, subWeeks, addMonths, subMonths, format } from "date-fns"
import { EntryDrawer } from "./entry-drawer"

type ViewType = "day" | "week" | "month"

export function WorkBoard() {
  const [viewType, setViewType] = useState<ViewType>("week")
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users] = useState<User[]>(mockUsers)
  const [entries, setEntries] = useState<Entry[]>(mockEntries)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    const mockUser = localStorage.getItem("mockUser")
    if (mockUser) {
      const userData = JSON.parse(mockUser)
      const existingUser = users.find((u) => u.email === userData.email)
      if (existingUser) {
        setCurrentUser(existingUser)
      } else {
        setCurrentUser({
          id: `user-${Date.now()}`,
          email: userData.email,
          name: userData.email.split("@")[0],
          role: userData.role,
          organizationId: "org-1",
        })
      }
    }
  }, [users])

  const handleAddEntry = (entry: Omit<Entry, "id" | "createdAt" | "updatedAt">) => {
    const newEntry: Entry = {
      ...entry,
      id: `entry-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setEntries([...entries, newEntry])
  }

  const handleUpdateEntry = (entryId: string, updates: Partial<Entry>) => {
    setEntries(
      entries.map((entry) =>
        entry.id === entryId ? { ...entry, ...updates, updatedAt: new Date().toISOString() } : entry,
      ),
    )
    if (selectedEntry?.id === entryId) {
      setSelectedEntry({ ...selectedEntry, ...updates } as Entry)
    }
  }

  const handleDeleteEntry = (entryId: string) => {
    setEntries(entries.filter((entry) => entry.id !== entryId))
    if (selectedEntry?.id === entryId) {
      setSelectedEntry(null)
      setIsDrawerOpen(false)
    }
  }

  const handleEntryClick = (entry: Entry) => {
    setSelectedEntry(entry)
    setIsDrawerOpen(true)
  }

  const handlePrevious = () => {
    if (viewType === "day") {
      setCurrentDate(subWeeks(currentDate, 1))
    } else if (viewType === "week") {
      setCurrentDate(subWeeks(currentDate, 2))
    } else {
      setCurrentDate(subMonths(currentDate, 1))
    }
  }

  const handleNext = () => {
    if (viewType === "day") {
      setCurrentDate(addWeeks(currentDate, 1))
    } else if (viewType === "week") {
      setCurrentDate(addWeeks(currentDate, 2))
    } else {
      setCurrentDate(addMonths(currentDate, 1))
    }
  }

  const getDateRangeLabel = () => {
    if (viewType === "day") {
      return format(currentDate, "MMM d, yyyy")
    } else if (viewType === "week") {
      return `${format(currentDate, "MMM d")} - ${format(addWeeks(currentDate, 2), "MMM d, yyyy")}`
    } else {
      return format(currentDate, "MMMM yyyy")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Tabs value={viewType} onValueChange={(v) => setViewType(v as ViewType)}>
          <TabsList className="bg-muted/50">
            <TabsTrigger value="day" className="data-[state=active]:bg-card">
              Day
            </TabsTrigger>
            <TabsTrigger value="week" className="data-[state=active]:bg-card">
              Week
            </TabsTrigger>
            <TabsTrigger value="month" className="data-[state=active]:bg-card">
              Month
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handlePrevious} className="hover:bg-muted">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-[200px] text-center font-medium text-foreground/80">{getDateRangeLabel()}</div>
          <Button variant="ghost" size="icon" onClick={handleNext} className="hover:bg-muted">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <BoardView
        viewType={viewType}
        currentDate={currentDate}
        users={users}
        entries={entries}
        currentUser={currentUser}
        onAddEntry={handleAddEntry}
        onUpdateEntry={handleUpdateEntry}
        onDeleteEntry={handleDeleteEntry}
        onEntryClick={handleEntryClick}
      />

      <EntryDrawer
        entry={selectedEntry}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentUser={currentUser}
        users={users}
        onUpdate={handleUpdateEntry}
        onDelete={handleDeleteEntry}
      />
    </div>
  )
}
