"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { startOfWeek, endOfWeek, eachDayOfInterval, format, addWeeks, startOfMonth, endOfMonth } from "date-fns"
import { EntryCell } from "./entry-cell"
import type { Entry, User } from "@/lib/mock-data"

interface BoardViewProps {
  viewType: "day" | "week" | "month"
  currentDate: Date
  users: User[]
  entries: Entry[]
  currentUser: User | null
  onAddEntry: (entry: Omit<Entry, "id" | "createdAt" | "updatedAt">) => void
  onUpdateEntry: (entryId: string, updates: Partial<Entry>) => void
  onDeleteEntry: (entryId: string) => void
  onEntryClick: (entry: Entry) => void
}

export function BoardView({
  viewType,
  currentDate,
  users,
  entries,
  currentUser,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
  onEntryClick,
}: BoardViewProps) {
  const employees = users.filter((u) => u.role === "employee")

  const getDefaultColumnWidth = () => {
    if (viewType === "day") return 140
    if (viewType === "week") return 220
    return 280
  }

  const [columnWidths, setColumnWidths] = useState<number[]>([])
  const [rowHeights, setRowHeights] = useState<{ [key: string]: number }>({})
  const [isResizing, setIsResizing] = useState<{ type: "column" | "row"; index: number | string } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startPos = useRef<number>(0)
  const startSize = useRef<number>(0)
  const dragThreshold = 3

  const getDates = () => {
    if (viewType === "day") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 })
      const end = endOfWeek(currentDate, { weekStartsOn: 1 })
      return eachDayOfInterval({ start, end })
    } else if (viewType === "week") {
      const week1Start = startOfWeek(currentDate, { weekStartsOn: 1 })
      const week2Start = startOfWeek(addWeeks(currentDate, 1), { weekStartsOn: 1 })
      return [
        { start: week1Start, end: endOfWeek(week1Start, { weekStartsOn: 1 }) },
        { start: week2Start, end: endOfWeek(week2Start, { weekStartsOn: 1 }) },
      ]
    } else {
      const start = startOfMonth(currentDate)
      const end = endOfMonth(currentDate)
      return [{ start, end }]
    }
  }

  const dates = getDates()

  if (columnWidths.length !== dates.length) {
    setColumnWidths(dates.map(() => getDefaultColumnWidth()))
  }

  const handleColumnMouseDown = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing({ type: "column", index })
    setIsDragging(false)
    startPos.current = e.clientX
    startSize.current = columnWidths[index] || getDefaultColumnWidth()
  }

  const handleRowMouseDown = (employeeId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing({ type: "row", index: employeeId })
    setIsDragging(false)
    startPos.current = e.clientY
    startSize.current = rowHeights[employeeId] || 140
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return

    if (isResizing.type === "column") {
      const diff = e.clientX - startPos.current
      if (!isDragging && Math.abs(diff) < dragThreshold) return
      if (!isDragging) setIsDragging(true)
      const newWidth = Math.max(100, startSize.current + diff)
      setColumnWidths((prev) => {
        const updated = [...prev]
        updated[isResizing.index as number] = newWidth
        return updated
      })
    } else {
      const diff = e.clientY - startPos.current
      if (!isDragging && Math.abs(diff) < dragThreshold) return
      if (!isDragging) setIsDragging(true)
      const newHeight = Math.max(100, startSize.current + diff)
      setRowHeights((prev) => ({
        ...prev,
        [isResizing.index]: newHeight,
      }))
    }
  }

  const handleMouseUp = () => {
    setIsResizing(null)
    setIsDragging(false)
  }

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isResizing, isDragging])

  const getDateFormat = (date: any) => {
    if (viewType === "day") {
      return format(date, "EEE\nMMM d")
    } else if (viewType === "week") {
      return `${format(date.start, "MMM d")} - ${format(date.end, "MMM d")}`
    } else {
      return format(date.start, "MMMM yyyy")
    }
  }

  const getEntriesForCell = (employeeId: string, dateOrRange: any) => {
    if (viewType === "day") {
      const dateStr = format(dateOrRange, "yyyy-MM-dd")
      return entries.filter((entry) => entry.employeeId === employeeId && entry.date === dateStr)
    } else {
      const start = dateOrRange.start
      const end = dateOrRange.end
      const daysInRange = eachDayOfInterval({ start, end })
      const dateStrs = daysInRange.map((d) => format(d, "yyyy-MM-dd"))
      return entries.filter((entry) => entry.employeeId === employeeId && dateStrs.includes(entry.date))
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border/60 bg-card shadow-sm">
      <div className="min-w-max">
        {/* Header Row */}
        <div className="flex border-b border-border/60 bg-muted/30 sticky top-0">
          <div className="w-52 shrink-0 border-r border-border/60 p-4 font-medium text-muted-foreground">
            Team Member
          </div>
          {dates.map((date, idx) => (
            <div key={idx} className="relative flex items-center">
              <div
                style={{ width: columnWidths[idx] || getDefaultColumnWidth() }}
                className="shrink-0 border-r border-border/60 p-4 text-center text-sm font-medium text-muted-foreground last:border-r-0"
              >
                <div className="whitespace-pre-line">{getDateFormat(date)}</div>
              </div>
              <div
                className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-primary/20 transition-colors z-10 group"
                onMouseDown={(e) => handleColumnMouseDown(idx, e)}
              >
                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-transparent group-hover:bg-primary/40 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Employee Rows */}
        {employees.map((employee) => (
          <div key={employee.id} className="relative">
            <div
              className="flex border-b border-border/40 last:border-b-0 hover:bg-muted/20 transition-colors"
              style={{ minHeight: rowHeights[employee.id] || 140 }}
            >
              <div className="w-52 shrink-0 border-r border-border/60 p-4 flex items-start">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{employee.name}</div>
                    <div className="text-xs text-muted-foreground">{employee.email}</div>
                  </div>
                </div>
              </div>
              {dates.map((date, idx) => (
                <div
                  key={idx}
                  style={{ width: columnWidths[idx] || getDefaultColumnWidth() }}
                  className="shrink-0 border-r border-border/40 p-3 last:border-r-0"
                >
                  <EntryCell
                    date={viewType === "day" ? date : date.start}
                    dateRange={viewType !== "day" ? date : undefined}
                    employeeId={employee.id}
                    entries={getEntriesForCell(employee.id, date)}
                    currentUser={currentUser}
                    onAddEntry={onAddEntry}
                    onUpdateEntry={onUpdateEntry}
                    onDeleteEntry={onDeleteEntry}
                    onEntryClick={onEntryClick}
                  />
                </div>
              ))}
            </div>
            <div
              className="absolute left-0 right-0 bottom-0 h-2 cursor-row-resize hover:bg-primary/20 transition-colors z-10 group"
              onMouseDown={(e) => handleRowMouseDown(employee.id, e)}
            >
              <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-transparent group-hover:bg-primary/40 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
