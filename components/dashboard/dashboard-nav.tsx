"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Lightbulb, LogOut } from "lucide-react"

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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-card/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">WorkJournal</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link href="/dashboard">
              <Button
                variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                size="sm"
                className="gap-2 h-8 px-3 text-sm"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Journal
              </Button>
            </Link>
            <Link href="/dashboard/insights">
              <Button
                variant={pathname === "/dashboard/insights" ? "secondary" : "ghost"}
                size="sm"
                className="gap-2 h-8 px-3 text-sm"
              >
                <Lightbulb className="h-3.5 w-3.5" />
                Insights
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="text-sm">
              <span className="font-medium">{user.name}</span>
              <span className="ml-2 text-xs text-muted-foreground capitalize px-2 py-0.5 bg-muted rounded-full">
                {user.role}
              </span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 h-8 text-muted-foreground">
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
