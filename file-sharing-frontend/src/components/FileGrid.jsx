import FileCard from "./FileCard"

const dummyFiles = [
  { id: 1, name: "Resume.pdf", size: "200 KB" },
  { id: 2, name: "Project.zip", size: "3.2 MB" },
]

const FileGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {dummyFiles.map(file => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  )
}

export default FileGrid
