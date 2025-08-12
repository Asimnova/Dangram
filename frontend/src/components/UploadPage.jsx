import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }
    // Implement actual upload logic with backend here
    setMessage(`File "${file.name}" ready to upload (backend integration pending).`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md transform transition hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-300 text-center mb-6">Upload Media</h2>
        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Video or Audio File</label>
            <input
              type="file"
              accept="video/*,audio/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          >
            Upload
          </button>
        </form>
        {message && <p className="mt-4 text-center text-emerald-600 dark:text-emerald-400 font-medium">{message}</p>}
      </div>
    </div>
  );
}