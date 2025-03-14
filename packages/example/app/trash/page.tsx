import { FileList } from "@/components/file-list"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Toaster } from "@/components/ui/toaster"

// Sample data for demonstration
const trashFiles = [
  { id: 6, name: "Old Report.pdf", type: "pdf", size: "3.1 MB", modified: "Feb 15, 2024", shared: false },
  { id: 7, name: "Outdated Logo.png", type: "image", size: "0.8 MB", modified: "Feb 10, 2024", shared: false },
]

export default function TrashPage() {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-muted/20 p-4">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Trash</h1>
            <FileList files={trashFiles} />
          </div>
        </main>
      </div>
    </div>
  )
}

