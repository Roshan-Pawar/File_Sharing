const FileCard = ({ file }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md cursor-pointer">
      <div className="text-4xl mb-2">📄</div>
      <p className="text-sm font-medium truncate">{file.name}</p>
      <p className="text-xs text-gray-500">{file.size}</p>
    </div>
  )
}

export default FileCard
