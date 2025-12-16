const Navbar = () => {
  return (
    <div className="h-14 bg-white border-b flex items-center px-6 justify-between">
      <h1 className="text-xl font-semibold">File Sharing</h1>
      <button className="text-sm bg-blue-600 text-white px-4 py-1 rounded">
        Upload
      </button>
    </div>
  )
}

export default Navbar
