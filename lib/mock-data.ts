export type UserRole = "employee" | "manager"

export type EntryMood = "productive" | "learning" | "challenging" | "collaborative"

export interface Entry {
  id: string
  title: string
  description?: string
  reflection?: string
  mood: EntryMood
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
  avatar?: string
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

export const mockEntries: Entry[] = [
  {
    id: "entry-1",
    title: "Worked on dashboard redesign",
    description: "Made progress on the new analytics dashboard layout",
    reflection: "Feeling good about the direction. The team feedback was helpful.",
    mood: "productive",
    date: "2024-01-15",
    employeeId: "user-1",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T17:00:00Z",
  },
  {
    id: "entry-2",
    title: "Deep dive into React patterns",
    description: "Spent time learning about compound components",
    reflection: "This will help with the component library we're building.",
    mood: "learning",
    date: "2024-01-16",
    employeeId: "user-1",
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
  },
  {
    id: "entry-3",
    title: "Debugging authentication flow",
    description: "Ran into some tricky edge cases with token refresh",
    reflection: "Need to pair with someone tomorrow to work through this.",
    mood: "challenging",
    date: "2024-01-15",
    employeeId: "user-2",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T14:00:00Z",
  },
  {
    id: "entry-4",
    title: "Updated API documentation",
    description: "Added examples for all new endpoints",
    mood: "productive",
    date: "2024-01-15",
    employeeId: "user-3",
    createdAt: "2024-01-15T11:00:00Z",
    updatedAt: "2024-01-15T16:00:00Z",
  },
  {
    id: "entry-5",
    title: "Sprint planning session",
    description: "Collaborated with product on Q2 roadmap",
    reflection: "Great alignment across teams. Excited about upcoming features.",
    mood: "collaborative",
    date: "2024-01-16",
    employeeId: "user-2",
    createdAt: "2024-01-16T14:00:00Z",
    updatedAt: "2024-01-16T15:00:00Z",
  },
]
