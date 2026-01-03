export type UserRole = "employee" | "manager"

export type TaskStatus = "planned" | "done" | "blocked"

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  date: string
  employeeId: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organizationId: string
}

export interface Organization {
  id: string
  name: string
  createdAt: string
}

// Mock data
export const mockOrganization: Organization = {
  id: "org-1",
  name: "Acme Corporation",
  createdAt: "2024-01-01T00:00:00Z",
}

export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "john@acme.com",
    name: "John Doe",
    role: "employee",
    organizationId: "org-1",
  },
  {
    id: "user-2",
    email: "jane@acme.com",
    name: "Jane Smith",
    role: "employee",
    organizationId: "org-1",
  },
  {
    id: "user-3",
    email: "bob@acme.com",
    name: "Bob Johnson",
    role: "employee",
    organizationId: "org-1",
  },
  {
    id: "user-4",
    email: "manager@acme.com",
    name: "Sarah Manager",
    role: "manager",
    organizationId: "org-1",
  },
]

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Design new feature",
    description: "Create mockups for the new dashboard",
    status: "done",
    date: "2024-01-15",
    employeeId: "user-1",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T17:00:00Z",
  },
  {
    id: "task-2",
    title: "Code review",
    status: "planned",
    date: "2024-01-16",
    employeeId: "user-1",
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
  },
  {
    id: "task-3",
    title: "Bug fix: Login issue",
    description: "Fix authentication redirect bug",
    status: "blocked",
    date: "2024-01-15",
    employeeId: "user-2",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T14:00:00Z",
  },
  {
    id: "task-4",
    title: "Update documentation",
    status: "done",
    date: "2024-01-15",
    employeeId: "user-3",
    createdAt: "2024-01-15T11:00:00Z",
    updatedAt: "2024-01-15T16:00:00Z",
  },
  {
    id: "task-5",
    title: "Team meeting",
    description: "Weekly sync",
    status: "done",
    date: "2024-01-16",
    employeeId: "user-2",
    createdAt: "2024-01-16T14:00:00Z",
    updatedAt: "2024-01-16T15:00:00Z",
  },
]
