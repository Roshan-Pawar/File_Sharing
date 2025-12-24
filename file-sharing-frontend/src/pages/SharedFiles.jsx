import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UploadModal from "../components/UploadModal";
import { useEffect } from "react";
import Api from "../services/api";

const SharedFiles = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [files, setFiles] = useState();

  useEffect(() => {
    const fetchShared = async () => {
      const { data } = await Api.get("/api/files/shared-with-me");
      setFiles(data);
    };
    fetchShared();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar onUploadClick={() => setShowUpload(true)} />

      {files.length === 0 ? (
        <p className="text-gray-500">No shared files yet</p>
      ) : (
        <FileGrid files={files} />
      )}

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
};

export default SharedFiles;
