"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { EntryMood } from "@/lib/mock-data"
import { Sparkles, BookOpen, Mountain, Users } from "lucide-react"

interface AddEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: { title: string; description?: string; mood: EntryMood }) => void
}

const moodOptions: { value: EntryMood; label: string; icon: any; description: string }[] = [
  { value: "productive", label: "Productive", icon: Sparkles, description: "Got things done" },
  { value: "learning", label: "Learning", icon: BookOpen, description: "Learned something new" },
  { value: "challenging", label: "Challenging", icon: Mountain, description: "Faced obstacles" },
  { value: "collaborative", label: "Collaborative", icon: Users, description: "Worked with others" },
]

export function AddEntryDialog({ open, onOpenChange, onSave }: AddEntryDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [mood, setMood] = useState<EntryMood>("productive")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      description: description || undefined,
      mood,
    })
    setTitle("")
    setDescription("")
    setMood("productive")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add work log</DialogTitle>
            <DialogDescription>Record what you worked on today</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-5">
            <div className="space-y-2">
              <Label htmlFor="title">What did you work on?</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief description of your work"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Details (optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more context..."
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label>How was it?</Label>
              <div className="grid grid-cols-2 gap-2">
                {moodOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setMood(option.value)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg border text-left transition-all",
                        mood === option.value
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-border hover:border-primary/40 hover:bg-muted/50",
                      )}
                    >
                      <Icon
                        className={cn("h-4 w-4", mood === option.value ? "text-primary" : "text-muted-foreground")}
                      />
                      <div>
                        <div className="font-medium text-sm">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save entry</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
