import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-full p-4">
      <ul className="space-y-3">
        <li>
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-200">
            My Files
          </Link>
        </li>
        <li>
          <Link to="/shared" className="block p-2 rounded hover:bg-gray-200">
            Shared with Me
          </Link>
        </li>
        <li className="text-red-600 cursor-pointer p-2">
          Logout
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
