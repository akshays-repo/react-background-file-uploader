"use client"
import { ClockIcon, HardDriveIcon, PlusIcon, ShareIcon, StarIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { UploadToast } from "./upload-toast"

export function Sidebar() {
  const pathname = usePathname()

  const sidebarItems = [
    { id: "my-drive", name: "My Drive", icon: HardDriveIcon, path: "/" },
    { id: "shared", name: "Shared with me", icon: ShareIcon, path: "/shared" },
    { id: "recent", name: "Recent", icon: ClockIcon, path: "/recent" },
    { id: "starred", name: "Starred", icon: StarIcon, path: "/starred" },
    { id: "trash", name: "Trash", icon: TrashIcon, path: "/trash" },
  ]

  const storageUsed = 65 // percentage

  const getActiveItem = (path: string) => {
    if (path === "/") return "my-drive"
    return path.substring(1) // Remove the leading slash
  }

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">


      <nav className="flex-1 space-y-1 p-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = getActiveItem(pathname) === item.id

          return (
            <Link
              key={item.id}
              href={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Storage</span>
          <span className="text-xs font-medium">6.5 GB of 10 GB used</span>
        </div>
        <Progress value={storageUsed} className="h-2" />

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-muted-foreground">Documents (2.1 GB)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Images (3.2 GB)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">Other (1.2 GB)</span>
          </div>
        </div>
      </div>

      {/* Upload toast that persists across navigation */}
      <UploadToast />
    </div>
  )
}

