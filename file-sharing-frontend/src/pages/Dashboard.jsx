import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import FileGrid from "../components/FileGrid"
import UploadModal from "../components/UploadModal"

const Dashboard = () => {
  const [showUpload, setShowUpload] = useState(false)

  return (
    <div className="h-screen flex flex-col">
      <Navbar onUploadClick={() => setShowUpload(true)} />

      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <FileGrid />
        </div>
      </div>

      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} />
      )}
    </div>
  )
}

export default Dashboard
