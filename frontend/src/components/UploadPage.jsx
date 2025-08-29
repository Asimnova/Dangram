import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/reels";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("video", file);
    formData.append("caption", caption);

    try {
      await axios.post(API_URL, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setMessage("Upload successful ✅");
    } catch (err) {
      setMessage("Upload failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleUpload} className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4">
        <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} className="w-full" />
        <input type="text" placeholder="Add a caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full p-2 text-black rounded" />
        <button type="submit" className="w-full bg-emerald-600 py-2 rounded">Upload</button>
        {message && <p className="text-center">{message}</p>}
      </form>
    </div>
  );
}

