import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { username: routeUsername } = useParams();
  const loggedInUsername = localStorage.getItem("username");
  const username = routeUsername || loggedInUsername || "Guest";
  const navigate = useNavigate();

  const [userContent, setUserContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/128"); // Default or current profile pic

  useEffect(() => {
    const fetchUserContent = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reels", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const userContentData = res.data.filter((item) => item.user.username === username);
        setUserContent(userContentData);
        setStats({
          posts: userContentData.length,
          followers: 0, // Update with actual backend data if available
          following: 0, // Update with actual backend data if available
        });
      } catch (err) {
        console.error("Error loading content:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchProfilePic = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${username}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfilePic(res.data.profilePic || "https://via.placeholder.com/128");
      } catch (err) {
        console.error("Error loading profile pic:", err);
      }
    };

    fetchUserContent();
    fetchProfilePic();
  }, [username]);

  const handleEditProfile = () => {
    navigate(`/user/${username}/edit`);
  };

  const handleProfilePicClick = () => {
    document.getElementById("profilePicInput").click();
  };

  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const res = await axios.put(
          `http://localhost:5000/api/user/${username}/profile-pic`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProfilePic(res.data.profilePic); // Update with new profile pic URL from backend
        alert("Profile picture updated successfully!");
      } catch (err) {
        console.error("Error uploading profile pic:", err);
        alert("Failed to update profile picture.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Profile Section */}
      <div className="flex-1 flex flex-col items-center pt-10">
        {/* Profile Header */}
        <div className="flex items-center space-x-10 w-3/4 border-b border-gray-800 pb-8">
          <div
            className="w-32 h-32 bg-gray-700 rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
            onClick={handleProfilePicClick}
          >
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            id="profilePicInput"
            type="file"
            accept="image/*"
            onChange={handleProfilePicUpload}
            className="hidden"
          />
          <div>
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl">{username}</h2>
              <button
                onClick={handleEditProfile}
                className="bg-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-600"
              >
                Edit Profile
              </button>
              <button className="bg-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-600">
                View Archive
              </button>
              <span className="cursor-pointer">⚙️</span>
            </div>
            <div className="flex space-x-8 mt-4">
              <span><b>{stats.posts}</b> posts</span>
              <span><b>{stats.followers}</b> followers</span>
              <span><b>{stats.following}</b> following</span>
            </div>
            <p className="mt-3 font-semibold">Reactredux</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-1 mt-6 w-3/4">
          {loading && <p className="text-center col-span-3">Loading...</p>}
          {!loading && userContent.length === 0 && (
            <p className="text-center col-span-3">No content yet</p>
          )}
          {userContent.map((item) => (
            <div key={item._id} className="relative">
              <video
                src={`http://localhost:5000${item.videoUrl}`}
                className="w-full h-72 object-cover"
                muted
                onClick={() => navigate(`/reel/${item._id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}