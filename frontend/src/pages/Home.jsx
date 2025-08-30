import { useState , useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
// import TrendingSidebar from "../components/TrendingSidebar";
import PostFeed from "../components/PostFeed";
import PostPage from "../components/PostPage";
import ReelsPage from "../components/ReelPage";
import UploadPage from "../components/UploadPage";
import SettingsPage from "../components/SettingsPage";
import BioPage from "../components/BioPage";
import ProfilePage from "../pages/ProfilePage";
import Feedback from "../components/Feedback";
import ExplorePage from "../components/ExplorePage";
import MessagesPage from "../components/MessagesPage";
import NotificationsPage from "../components/NotificationsPage";
import SearchPage from "../pages/SearchPage";





















export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username") || "Guest");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark"); // Default to dark

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  // Handle home button click to reset to feed
  const handleHomeClick = () => {
    navigate("/home", { replace: true }); // Replace history to avoid back navigation issues
    // Force reroute to index if not already on feed
    if (window.location.pathname !== "/home") {
      navigate(".", { replace: true }); // Relative path to index route
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* 🔹 Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-gray-800 backdrop-blur-md shadow-md px-6 py-4">
        <h1
          onClick={handleHomeClick} // Updated to use custom handler
          className="text-3xl font-extrabold text-indigo-300 cursor-pointer hover:scale-105 transition-transform"
        >
          Dangram
        </h1>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <input
            type="search"
            placeholder="🔍 Search Dangram..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg border border-gray-600 rounded-full px-4 py-2 shadow-sm bg-gray-700 text-white focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-white">{username}</span>

          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-full bg-gray-700 text-gray-100 hover:bg-gray-600 transition"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition transform hover:scale-105"
          >
            🚪 Sign Out
          </button>
        </div>
      </header>

      {/* 🔹 Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Feed / Pages */}
        <main className="flex-1 px-6 py-4 overflow-y-auto max-w-3xl mx-auto space-y-6">
          <Routes>
            {/* Feed */}
            <Route
              index
              element={
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">✨ Latest Feed</h2>
                    <button
                      onClick={() => navigate("/home/upload")}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow hover:scale-105 transition"
                    >
                      ➕ Create Post
                    </button>
                  </div>
                  <PostFeed searchTerm={search} />
                </>
              }
            />

            {/* Other Pages */}
            <Route path="post" element={<PostPage />} />
            <Route path="reels" element={<ReelsPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="bio" element={<BioPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="search"  element={<SearchPage/>}/>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="." replace />} />
          </Routes>
        </main>

        {/* Trending Sidebar */}
        {/* <TrendingSidebar /> */}
      </div>
    </div>
  );
}