import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import FileGrid from "../components/FileGrid"

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <FileGrid />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
