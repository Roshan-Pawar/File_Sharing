import Api from "../services/api";

const FileCard = ({ file }) => {
  const openFile = async () => {
    try {
      const { data } = await Api.get(`/api/files/signed-url/${file.id}`);
      window.open(data.url, "_blank");
    } catch {
      alert("Unable to open file");
    }
  };

  const shareFile = async (e) => {
    e.stopPropagation() 
    try {
      const { data } = await Api.post(`/files/share/${file.id}`)
      await navigator.clipboard.writeText(data.shareLink)
      alert("link copied to clipboard!")
    } catch {
      alert("Failed to generate link")
    }
  }

  return (
    <div
      onClick={openFile}
      className="bg-white p-4 rounded shadow hover:shadow-md cursor-pointer"
    >
      <div className="text-4xl mb-2">📄</div>
      <p className="text-sm font-medium truncate">{file.original_name}</p>
      <p className="text-xs text-gray-500">
        {(file.size / 1024).toFixed(2)} KB
      </p>
      <p className="text-xs text-gray-500">{file.created_at}</p>
      <button
        onClick={shareFile}
        className="text-sm text-blue-600 hover:underline"
      >
        Share
      </button>
    </div>
  );
};

export default FileCard;
