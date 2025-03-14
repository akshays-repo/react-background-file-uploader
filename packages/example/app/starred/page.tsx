import { FileList } from "@/components/file-list"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Toaster } from "@/components/ui/toaster"

// Sample data for demonstration
const starredFiles = [
  {
    id: 2,
    name: "Budget 2024.xlsx",
    type: "spreadsheet",
    size: "1.8 MB",
    modified: "Yesterday, 10:15 AM",
    shared: false,
  },
  { id: 5, name: "Meeting Notes.pdf", type: "pdf", size: "1.2 MB", modified: "Mar 5, 2024", shared: false },
]

export default function StarredPage() {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-muted/20 p-4">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Starred Files</h1>
            <FileList files={starredFiles} />
          </div>
        </main>
      </div>
    </div>
  )
}

