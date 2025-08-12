import { useState } from "react";

export default function BioPage() {
  const [bio, setBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [message, setMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    // Integrate with backend API to save bio and photo
    setMessage("Bio saved (backend integration pending).");
  };

  const handlePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md transform transition hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-amber-800 dark:text-amber-300 text-center mb-6">Update Your Bio</h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
            <textarea
              rows="5"
              placeholder="Write your bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 transition resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
          >
            Save Bio
          </button>
        </form>
        {message && <p className="mt-4 text-center text-amber-600 dark:text-amber-400 font-medium">{message}</p>}
      </div>
    </div>
  );
}