"use client"

import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface UploadProgressProps {
  fileName: string
  progress: number
  size: string
  onRemove: () => void
}

export function UploadProgress({ fileName, progress, size, onRemove }: UploadProgressProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium truncate max-w-[200px]">{fileName}</span>
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
        <Progress value={progress} color="#fff" className="h-2 mt-1 bg-green-600" />
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onRemove}>
        <XIcon className="h-4 w-4" />
        <span className="sr-only">Cancel upload</span>
      </Button>
    </div>
  )
}

