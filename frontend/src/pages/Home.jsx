import { useState , useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import TrendingSidebar from "../components/TrendingSidebar";
import PostFeed from "../components/PostFeed";
import PostPage from "../components/PostPage";
import ReelsPage from "../components/ReelPage";
import UploadPage from "../components/UploadPage";
import SettingsPage from "../components/SettingsPage";
import BioPage from "../components/BioPage";
import ProfilePage from "./ProfilePage";
import Feedback from "../components/Feedback";








export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest'); // Default to 'Guest' if not set
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    // Update username if changed in localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <header className="flex items-center justify-between bg-white dark:bg-gray-800 shadow-lg p-4">
        <h1
          className="text-3xl font-extrabold text-indigo-800 dark:text-indigo-300 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          onClick={() => navigate("/home")}
        >
          Dangram
        </h1>
        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-full p-2 px-4 max-w-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
        <div className="flex items-center space-x-4">
          <span className="text-gray-800 dark:text-white font-medium">{username}</span>
          <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          <button
            onClick={handleSignOut}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Sign Out
          </button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 p-6 max-w-4xl overflow-y-auto space-y-6">
          <Routes>
            <Route
              index
              element={
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Feed</h2>
                    <button
                      className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition transform hover:scale-105"
                      onClick={() => navigate("/home/post")}
                    >
                      Create Post
                    </button>
                  </div>
                  <PostFeed searchTerm={search} />
                </>
              }
            />
            <Route path="post" element={<PostPage />} />
            <Route path="reels" element={<ReelsPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="bio" element={<BioPage />} />
            <Route path="profile" element={<ProfilePage />} /> {/* New route */}
            <Route path="*" element={<Navigate to="." replace />} />
          </Routes>
        </main>
        <TrendingSidebar />
      </div>
    </div>
  );
}