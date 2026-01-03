"use client"

import { cn } from "@/lib/utils"
import type { Entry } from "@/lib/mock-data"
import { Sparkles, BookOpen, Mountain, Users } from "lucide-react"

interface EntryCardProps {
  entry: Entry
  onClick: () => void
}

const moodConfig = {
  productive: {
    bg: "bg-[var(--mood-productive)]/10",
    border: "border-[var(--mood-productive)]/30",
    text: "text-[var(--mood-productive)]",
    icon: Sparkles,
  },
  learning: {
    bg: "bg-[var(--mood-learning)]/10",
    border: "border-[var(--mood-learning)]/30",
    text: "text-[var(--mood-learning)]",
    icon: BookOpen,
  },
  challenging: {
    bg: "bg-[var(--mood-challenging)]/10",
    border: "border-[var(--mood-challenging)]/30",
    text: "text-[var(--mood-challenging)]",
    icon: Mountain,
  },
  collaborative: {
    bg: "bg-[var(--mood-collaborative)]/10",
    border: "border-[var(--mood-collaborative)]/30",
    text: "text-[var(--mood-collaborative)]",
    icon: Users,
  },
}

export function EntryCard({ entry, onClick }: EntryCardProps) {
  const mood = moodConfig[entry.mood]
  const Icon = mood.icon

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-lg p-3 text-sm transition-all",
        "border hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]",
        mood.bg,
        mood.border,
      )}
    >
      <div className="flex items-start gap-2">
        <Icon className={cn("h-3.5 w-3.5 mt-0.5 shrink-0", mood.text)} />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground line-clamp-2 leading-snug">{entry.title}</div>
          {entry.description && (
            <div className="mt-1 text-xs text-muted-foreground line-clamp-1">{entry.description}</div>
          )}
        </div>
      </div>
    </button>
  )
}
