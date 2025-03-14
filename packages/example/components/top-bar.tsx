"use client"

import { BellIcon, MenuIcon, SearchIcon, UploadCloudIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useBackgroundFileUpload } from "react-background-file-uploader"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function TopBar() {
  const { uploads } = useBackgroundFileUpload()

  // Count active uploads
  const activeUploads = uploads.filter((u) => u.status === "uploading").length

  return (
    <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/placeholder.svg?height=32&width=32" width={32} height={32} alt="Logo" className="rounded" />
          <span className="text-xl font-bold">Drive</span>
        </Link>
      </div>

      <div className="hidden md:flex md:flex-1 md:max-w-md lg:max-w-lg">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search in Drive" className="w-full pl-9" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <UploadCloudIcon className="h-5 w-5" />
          {activeUploads > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {activeUploads}
            </Badge>
          )}
          <span className="sr-only">Active uploads</span>
        </Button>
        <Button variant="ghost" size="icon">
          <SearchIcon className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Image
            src="/placeholder.svg?height=32&width=32"
            width={32}
            height={32}
            alt="Avatar"
            className="rounded-full"
          />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  )
}

