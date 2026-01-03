import type { User } from "./mock-data"

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const mockUser = localStorage.getItem("mockUser")
  if (!mockUser) return null

  const userData = JSON.parse(mockUser)
  return userData
}

export function canEditTask(currentUser: User | null, taskEmployeeId: string): boolean {
  if (!currentUser) return false
  // Employees can only edit their own tasks
  if (currentUser.role === "employee") {
    return currentUser.id === taskEmployeeId
  }
  // Managers cannot edit any tasks (read-only)
  return false
}

export function canViewBoard(currentUser: User | null): boolean {
  // Everyone can view the board
  return currentUser !== null
}

export function isManager(currentUser: User | null): boolean {
  return currentUser?.role === "manager"
}

export function isEmployee(currentUser: User | null): boolean {
  return currentUser?.role === "employee"
}
