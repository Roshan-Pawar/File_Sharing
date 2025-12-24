import { useState } from "react";
import Api from "../services/api";

const ShareModal = ({ fileId, onClose }) => {
  const [emails, setEmails] = useState("");

  const submitShare = async () => {
    const emailList = emails
      .split(",")
      .map(e => e.trim())
      .filter(Boolean);

    await Api.post(`/api/files/share/${fileId}`, {
      emails: emailList
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="font-semibold mb-3">Share file</h2>

        <input
          placeholder="Enter emails (comma separated)"
          className="border p-2 w-full"
          value={emails}
          onChange={e => setEmails(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submitShare}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
