import { FileList } from "@/components/file-list"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"

// Sample data for demonstration
const recentFiles = [
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
]

export default function RecentPage() {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-muted/20 p-4">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Recent Files</h1>
            <FileList files={recentFiles} />
          </div>
        </main>
      </div>
    </div>
  )
}

