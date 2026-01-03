"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Lightbulb, LogOut } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

  useEffect(() => {
    const mockUser = localStorage.getItem("mockUser")
    if (mockUser) {
      setUser(JSON.parse(mockUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("mockUser")
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">WorkBoard</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link href="/dashboard">
              <Button variant={pathname === "/dashboard" ? "secondary" : "ghost"} size="sm" className="gap-2">
                <LayoutGrid className="h-4 w-4" />
                Board
              </Button>
            </Link>
            <Link href="/dashboard/insights">
              <Button variant={pathname === "/dashboard/insights" ? "secondary" : "ghost"} size="sm" className="gap-2">
                <Lightbulb className="h-4 w-4" />
                AI Insights
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="text-sm">
              <span className="font-medium">{user.name}</span>
              <span className="ml-2 text-xs text-muted-foreground capitalize">({user.role})</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
