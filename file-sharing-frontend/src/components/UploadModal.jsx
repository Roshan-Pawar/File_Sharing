import { useDropzone } from "react-dropzone"

const UploadModal = () => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: (files) => {
      console.log(files)
    }
  })

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-10 text-center rounded bg-white cursor-pointer"
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        Drag & drop files here or click to upload
      </p>
    </div>
  )
}

export default UploadModal
