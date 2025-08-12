import { useNavigate } from "react-router-dom";

export default function LeftSidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-4 space-y-4">
      <button
        onClick={() => navigate("/home/post")}
        className="w-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 p-3 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
      >
        Post
      </button>
      <button
        onClick={() => navigate("/home/reels")}
        className="w-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 p-3 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition"
      >
        Reels
      </button>
      <button
        onClick={() => navigate("/home/upload")}
        className="w-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-3 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition"
      >
        Upload
      </button>
      <button
        onClick={() => navigate("/home/settings")}
        className="w-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-3 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition"
      >
        Settings
      </button>
      <button
        onClick={() => navigate("/home/bio")}
        className="w-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-3 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
      >
        Bio
      </button>
    </div>
  );
}