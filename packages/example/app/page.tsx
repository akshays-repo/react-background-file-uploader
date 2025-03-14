import { FileUploader } from "@/components/file-uploader"
import FloatingComponent from "@/components/floating-widget"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-muted/20 p-4">
          <FileUploader />
        </main>
      </div>

    </div>
  )
}

