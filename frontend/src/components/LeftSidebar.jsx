// src/components/LeftSidebar.jsx
import { Home, Search, Compass, Film, MessageSquare, Heart, PlusSquare, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LeftSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", icon: <Home />, path: "/home" },
    { label: "Search", icon: <Search />, path: "/home/search" },   // <-- only works if you add a Search route
    { label: "Explore", icon: <Compass />, path: "/home/explore" },
    { label: "Reels", icon: <Film />, path: "/home/reels" },
    { label: "Messages", icon: <MessageSquare />, path: "/home/messages" },
    { label: "Notifications", icon: <Heart />, path: "/home/notifications" },
    { label: "Create", icon: <PlusSquare />, path: "/home/upload" },
    { label: "Profile", icon: <User />, path: "/home/profile" },
  ];

  return (
    <aside className="w-64 bg-black text-white h-screen flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Dangram</h1>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
