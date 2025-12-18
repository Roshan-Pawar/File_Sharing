import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UploadModal from "../components/UploadModal";

const SharedFiles = () => {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <div className="h-screen flex flex-col">
      <Navbar onUploadClick={() => setShowUpload(true)} />

      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <p className="text-gray-500">No shared files yet</p>
        </div>
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
};

export default SharedFiles;
