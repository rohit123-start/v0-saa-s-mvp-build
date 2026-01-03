"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { X, Pencil, Trash2, Sparkles, BookOpen, Mountain, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { Entry, EntryMood, User } from "@/lib/mock-data"
import { canEditTask, isManager } from "@/lib/auth"

interface EntryDrawerProps {
  entry: Entry | null
  isOpen: boolean
  onClose: () => void
  currentUser: User | null
  users: User[]
  onUpdate: (entryId: string, updates: Partial<Entry>) => void
  onDelete: (entryId: string) => void
}

const moodConfig = {
  productive: { label: "Productive", icon: Sparkles, color: "text-[var(--mood-productive)]" },
  learning: { label: "Learning", icon: BookOpen, color: "text-[var(--mood-learning)]" },
  challenging: { label: "Challenging", icon: Mountain, color: "text-[var(--mood-challenging)]" },
  collaborative: { label: "Collaborative", icon: Users, color: "text-[var(--mood-collaborative)]" },
}

const moodOptions: EntryMood[] = ["productive", "learning", "challenging", "collaborative"]

export function EntryDrawer({ entry, isOpen, onClose, currentUser, users, onUpdate, onDelete }: EntryDrawerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editReflection, setEditReflection] = useState("")
  const [editMood, setEditMood] = useState<EntryMood>("productive")

  const author = entry ? users.find((u) => u.id === entry.employeeId) : null
  const canEdit = entry && currentUser ? canEditTask(currentUser, entry.employeeId) : false
  const isManagerRole = isManager(currentUser)

  useEffect(() => {
    if (entry) {
      setEditTitle(entry.title)
      setEditDescription(entry.description || "")
      setEditReflection(entry.reflection || "")
      setEditMood(entry.mood)
    }
  }, [entry])

  const handleSave = () => {
    if (entry) {
      onUpdate(entry.id, {
        title: editTitle,
        description: editDescription || undefined,
        reflection: editReflection || undefined,
        mood: editMood,
      })
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    if (entry && confirm("Are you sure you want to delete this entry?")) {
      onDelete(entry.id)
    }
  }

  if (!entry) return null

  const mood = moodConfig[entry.mood]
  const MoodIcon = mood.icon

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/5 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-card border-l shadow-xl z-50 transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              {author && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                  {author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
              <div>
                <div className="font-medium">{author?.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(entry.date), "EEEE, MMMM d, yyyy")}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label>What did you work on?</Label>
                  <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Details</Label>
                  <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Reflections</Label>
                  <Textarea
                    value={editReflection}
                    onChange={(e) => setEditReflection(e.target.value)}
                    placeholder="What did you learn? What would you do differently?"
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label>How was it?</Label>
                  <div className="flex flex-wrap gap-2">
                    {moodOptions.map((m) => {
                      const config = moodConfig[m]
                      const Icon = config.icon
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setEditMood(m)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm",
                            editMood === m ? "border-primary bg-primary/5" : "border-border hover:border-primary/40",
                          )}
                        >
                          <Icon className={cn("h-4 w-4", config.color)} />
                          {config.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Mood badge */}
                <div
                  className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm", mood.color)}
                >
                  <MoodIcon className="h-4 w-4" />
                  {mood.label}
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground leading-snug">{entry.title}</h2>
                </div>

                {/* Description */}
                {entry.description && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Details</h3>
                    <p className="text-foreground/80 leading-relaxed">{entry.description}</p>
                  </div>
                )}

                {/* Reflection */}
                {entry.reflection && (
                  <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Reflections</h3>
                    <p className="text-foreground/80 leading-relaxed italic">"{entry.reflection}"</p>
                  </div>
                )}

                {/* Timestamps */}
                <div className="text-xs text-muted-foreground pt-4 border-t space-y-1">
                  <div>Created: {format(new Date(entry.createdAt), "MMM d, yyyy 'at' h:mm a")}</div>
                  {entry.updatedAt !== entry.createdAt && (
                    <div>Updated: {format(new Date(entry.updatedAt), "MMM d, yyyy 'at' h:mm a")}</div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer actions */}
          {canEdit && !isManagerRole && (
            <div className="p-4 border-t flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="ghost" onClick={() => setIsEditing(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="flex-1">
                    Save changes
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(true)} className="flex-1">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleDelete}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
