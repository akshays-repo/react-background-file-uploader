import { FileList } from "@/components/file-list"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Toaster } from "@/components/ui/toaster"

// Sample data for demonstration
const sharedFiles = [
  { id: 1, name: "Project Proposal.docx", type: "document", size: "2.4 MB", modified: "Today, 2:30 PM", shared: true },
  { id: 3, name: "Team Photo.jpg", type: "image", size: "4.2 MB", modified: "Mar 10, 2024", shared: true },
]

export default function SharedPage() {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-muted/20 p-4">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Shared with me</h1>
            <FileList files={sharedFiles} />
          </div>
        </main>
      </div>
    </div>
  )
}

