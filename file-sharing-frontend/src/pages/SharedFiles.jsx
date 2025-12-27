import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Api from "../services/api";
import UploadModal from "../components/UploadModal";
import SharedFileGrid from "../components/SharedFileGrid";

const SharedFiles = () => {
  const [files, setFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false)

  useEffect(() => {
    Api.get("/api/files/shared-with-me").then(res => {
      setFiles(res.data);
    });
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar onUploadClick={() => setShowUpload(true)}/>
        <div className="flex-1 p-6 bg-gray-50">
          {files.length === 0
            ? <p>No shared files</p>
            : <SharedFileGrid files={files} />}
        </div>
      </div>
      {showUpload && (
          <UploadModal onClose={() => setShowUpload(false)} />
        )}
    </div>
  );
};

export default SharedFiles;
