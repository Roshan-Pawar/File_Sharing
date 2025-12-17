const FileCard = ({ file }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="font-medium truncate">{file.original_name}</p>
      <p className="text-xs text-gray-500">
        {(file.size / 1024).toFixed(2)} KB
      </p>
    </div>
  )
}

export default FileCard
