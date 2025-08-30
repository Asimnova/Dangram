import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ReelPage() {
  const [reels, setReels] = useState([]);
  const [soundOn, setSoundOn] = useState(null); // track which reel has sound
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reels", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReels(res.data || []);
      } catch (err) {
        console.error("Error loading reels:", err);
      }
    };
    fetchReels();
  }, [token]);

  useEffect(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.addEventListener("play", () => {
        videos.forEach((other) => {
          if (other !== video) other.pause();
        });
      });
    });
  }, [reels]);

  const handleLike = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/reels/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReels((prev) =>
        prev.map((r) =>
          r._id === id
            ? {
                ...r,
                likes: r.likes?.includes("me")
                  ? r.likes.filter((l) => l !== "me")
                  : [...(r.likes || []), "me"],
              }
            : r
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = (id) => {
    const url = `${window.location.origin}/reel/${id}`;
    if (navigator.share) {
      navigator.share({ title: "Check this reel!", url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  const handleVideoClick = (video) => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleVideoDoubleClick = (video) => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory" style={{ scrollBehavior: 'smooth' }}>
      {reels.map((reel) => (
        <div
          key={reel._id}
          className="h-screen w-full flex justify-center items-center relative snap-start"
        >
          {/* Video */}
          <video
            src={`http://localhost:5000${reel.videoUrl}`}
            className="max-h-full max-w-full object-contain"
            loop
            autoPlay
            playsInline
            muted={soundOn !== reel._id}
            onClick={(e) => handleVideoClick(e.target)}
            onDoubleClick={(e) => handleVideoDoubleClick(e.target)}
          />

          {/* Overlay Info (Top Left) */}
          <div className="absolute top-4 left-4 flex items-center space-x-2 z-20 bg-black/70 p-2 rounded-lg">
            <img
              src={reel.user?.profilePic || "default-profile.jpg"}
              alt={reel.user?.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3
                className="text-white font-bold text-sm cursor-pointer hover:underline"
                onClick={() => navigate(`/user/${reel.user._id}`)}
              >
                @{reel.user?.username}
              </h3>
              <button className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded">
                Follow
              </button>
            </div>
          </div>

          {/* Caption and Audio Info (Bottom Left) */}
          <div className="absolute bottom-16 left-4 text-white z-20 bg-black/70 p-2 rounded-lg">
            <p className="text-sm text-gray-200">{reel.caption}</p>
            <div className="text-xs text-gray-400 flex items-center">
              <span>Original audio</span>
              <span className="ml-2">@{reel.user?.username}</span>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            className="absolute bottom-5 left-5 bg-black/60 text-white p-2 rounded-full z-20"
            onClick={() => setSoundOn(soundOn === reel._id ? null : reel._id)}
          >
            {soundOn === reel._id ? "🔊" : "🔇"}
          </button>

          {/* Actions (Right Side) */}
          <div className="absolute right-4 bottom-20 flex flex-col gap-6 items-center text-white z-20">
            <button
              className="bg-white/20 rounded-full p-3 hover:bg-red-500/20 hover:scale-110 transition"
              onClick={() => handleLike(reel._id)}
            >
              ❤️
            </button>
            <span className="text-sm">{reel.likes?.length || 0}</span>

            <button
              className="bg-white/20 rounded-full p-3 hover:bg-blue-500/20 hover:scale-110 transition"
              onClick={() => navigate(`/reel/${reel._id}`)}
            >
              💬
            </button>
            <span className="text-sm">{reel.comments?.length || 0}</span>

            <button
              className="bg-white/20 rounded-full p-3 hover:bg-green-500/20 hover:scale-110 transition"
              onClick={() => handleShare(reel._id)}
            >
              🔗
            </button>
          </div>

          {/* More Options (Top Right) */}
          <button className="absolute top-4 right-4 text-white bg-black/60 p-2 rounded-full hover:bg-black/80 z-20">
            ⋮
          </button>
        </div>
      ))}
    </div>
  );
}