"use client"

import { useEffect } from "react"
import { useBackgroundFileUpload } from "react-background-file-uploader"

import { useToast } from "@/hooks/use-toast"

export function UploadToast() {
  const { uploads, cancelUpload } = useBackgroundFileUpload()
  const { toast } = useToast()
  return null // This component doesn't render anything, it just manages toasts
}

