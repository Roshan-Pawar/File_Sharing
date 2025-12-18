import Api from "../services/Api"

const FileCard = ({ file }) => {
  const openFile = async () => {
    try {
      const { data } = await Api.get(`/files/signed-url/${file.id}`)
      window.open(data.url, "_blank")
    } catch {
      alert("Unable to open file")
    }
  }

  return (
    <div
      onClick={openFile}
      className="bg-white p-4 rounded shadow hover:shadow-md cursor-pointer"
    >
      <div className="text-4xl mb-2">📄</div>
      <p className="text-sm font-medium truncate">
        {file.original_name}
      </p>
      <p className="text-xs text-gray-500">
        {(file.size / 1024).toFixed(2)} KB
      </p>
      <p className="text-xs text-gray-500">
        {file.created_at}
      </p>
    </div>
  )
}

export default FileCard
