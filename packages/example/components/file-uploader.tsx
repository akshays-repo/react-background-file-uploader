"use client"

import type React from "react"

import { useState } from "react"
import { useBackgroundFileUpload } from "react-background-file-uploader"
import { UploadCloudIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileList } from "./file-list"

// Sample data for demonstration
const sampleFiles = [
  { id: 1, name: "Project Proposal.docx", type: "document", size: "2.4 MB", modified: "Today, 2:30 PM", shared: true },
  {
    id: 2,
    name: "Budget 2024.xlsx",
    type: "spreadsheet",
    size: "1.8 MB",
    modified: "Yesterday, 10:15 AM",
    shared: false,
  },
  { id: 3, name: "Team Photo.jpg", type: "image", size: "4.2 MB", modified: "Mar 10, 2024", shared: true },
  { id: 4, name: "Presentation.pptx", type: "presentation", size: "5.7 MB", modified: "Mar 8, 2024", shared: false },
  { id: 5, name: "Meeting Notes.pdf", type: "pdf", size: "1.2 MB", modified: "Mar 5, 2024", shared: false },
]

export function FileUploader() {
  const [activeTab, setActiveTab] = useState("my-drive")
  const [isDragging, setIsDragging] = useState(false)

  // Use the react-background-file-uploader hook
  const { addUpload, startUpload, cancelUpload } = useBackgroundFileUpload()

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    // Add files to the upload queue
    Array.from(files).forEach((file) => {
      addUpload(file)
    })

    // Start uploading immediately
    startUpload("/api/upload", {
      onSuccess: (file) => {

        console.log(file)
      },
      onError: (file, error) => {

        console.log(error)
      },
    })
  }



  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files)
  }


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Drive</h1>
        <Button onClick={() => document.getElementById("file-input")?.click()}>
          <UploadCloudIcon className="mr-2 h-4 w-4" />
          Upload
        </Button>
        <input
          id="file-input"
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </div>

      <Tabs defaultValue="my-drive" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="my-drive">My Drive</TabsTrigger>
          <TabsTrigger value="shared">Shared with me</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        <TabsContent value="my-drive" className="mt-6">
          <div
            className={`mb-6 rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragging ? "border-primary bg-primary/10" : "border-border"
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadCloudIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-semibold">Drag and drop files here</h3>
            <p className="text-sm text-muted-foreground">or click the Upload button above</p>
          </div>

          <FileList files={sampleFiles} />
        </TabsContent>
        <TabsContent value="shared" className="mt-6">
          <FileList files={sampleFiles.filter((file) => file.shared)} />
        </TabsContent>
        <TabsContent value="recent" className="mt-6">
          <FileList files={sampleFiles.slice(0, 3)} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

