"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BoardView } from "./board-view"
import { mockUsers, mockTasks, type Task, type User } from "@/lib/mock-data"
import { addWeeks, subWeeks, addMonths, subMonths, format } from "date-fns"

type ViewType = "day" | "week" | "month"

export function WorkBoard() {
  const [viewType, setViewType] = useState<ViewType>("week")
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users] = useState<User[]>(mockUsers)
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  useEffect(() => {
    const mockUser = localStorage.getItem("mockUser")
    if (mockUser) {
      const userData = JSON.parse(mockUser)
      const user = users.find((u) => u.email === userData.email) || users[0]
      setCurrentUser(user)
    }
  }, [users])

  const handleAddTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTasks([...tasks, newTask])
  }

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task)),
    )
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs value={viewType} onValueChange={(v) => setViewType(v as ViewType)}>
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-[200px] text-center font-medium">{getDateRangeLabel()}</div>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <BoardView
        viewType={viewType}
        currentDate={currentDate}
        users={users}
        tasks={tasks}
        currentUser={currentUser}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  )
}
