import { useDropzone } from "react-dropzone"
import Api from "../services/api"

const UploadModal = ({ onClose }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: async (files) => {
      const formData = new FormData()
      files.forEach(file => formData.append("files", file))

      try {
        await Api.post("/api/files/upload", formData)
        onClose()
        window.location.reload() // simple for now
      } catch {
        alert("Upload failed")
      }
    }
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="font-semibold mb-4">Upload Files</h2>

        <div
          {...getRootProps()}
          className="border-2 border-dashed p-6 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p>Drag & drop or click</p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default UploadModal
