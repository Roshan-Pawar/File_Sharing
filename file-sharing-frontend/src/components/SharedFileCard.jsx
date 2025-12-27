import Api from "../services/api";

const SharedFileCard = ({ file }) => {
  const openFile = () => {
    window.open(file.path, "_blank");
  };

  const istTime = new Date(file.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

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
      <p className="text-xs text-gray-400">Shared on {istTime}</p>
    </div>
  );
};

export default SharedFileCard;
