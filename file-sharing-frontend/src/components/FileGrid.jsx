import { useEffect, useState } from "react"
import Api from "../services/api"
import FileCard from "./FileCard"

const FileGrid = () => {
  const [files, setFiles] = useState([])

  useEffect(() => {
    const fetchFiles = async () => {
      const { data } = await Api.get("/api/files")
      setFiles(data)
    }
    fetchFiles()
  }, [])

  return (
    <div className="grid grid-cols-4 gap-4">
      {files.map(file => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  )
}

export default FileGrid
