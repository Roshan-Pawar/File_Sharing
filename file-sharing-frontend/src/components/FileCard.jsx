import { useState } from "react";
import Api from "../services/api";
import ShareModal from "./ShareModal";

const FileCard = ({ file, onDelete }) => {
  const [showShare, setShowShare] = useState(false);

  const openFile = () => {
    window.open(file.path, "_blank");
  };

  const deleteFile = async (e) => {
    e.stopPropagation();
    if (!confirm("Delete this file?")) return;

    await Api.delete(`/api/files/${file.id}`);
    onDelete(file.id);
  };

  const istTime = new Date(file.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md cursor-pointer">
      <div onClick={openFile}>
        <div className="text-4xl mb-2">📄</div>
        <p className="text-sm font-medium truncate">{file.original_name}</p>
        <p className="text-xs text-gray-500">
          {(file.size / 1024).toFixed(2)} KB
        </p>
        <p className="text-xs text-gray-500">{istTime}</p>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowShare(true);
          }}
          className="text-blue-600 text-sm"
        >
          Share
        </button>

        <button onClick={deleteFile} className="text-red-600 text-sm">
          Delete
        </button>
      </div>

      {showShare && (
        <ShareModal fileId={file.id} onClose={() => setShowShare(false)} />
      )}
    </div>
  );
};

export default FileCard;
