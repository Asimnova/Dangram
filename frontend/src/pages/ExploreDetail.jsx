import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ExploreDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState(state?.content || null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    if (!content) {
      const storedContent = JSON.parse(localStorage.getItem("exploreContent") || "[]");
      const foundContent = storedContent.find((item) => item._id === state?.content?._id);
      if (foundContent) setContent(foundContent);
    }
  }, [content]);

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

  const handleLike = () => {
    console.log("Liked:", content?._id);
    // Implement backend like logic here (e.g., axios.put)
  };

  const handleShare = () => {
    const url = `${window.location.origin}/explore/detail`;
    if (navigator.share) {
      navigator.share({ title: "Check this content!", url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  if (!content) return <div className="h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory" style={{ scrollBehavior: "smooth" }}>
      <div className="h-screen w-full flex justify-center items-center relative snap-start">
        {content.videoUrl ? (
          <video
            src={`http://localhost:5000${content.videoUrl}`}
            className="max-h-full max-w-full object-contain"
            loop
            autoPlay
            playsInline
            muted={!soundOn}
            onClick={(e) => handleVideoClick(e.target)}
            onDoubleClick={(e) => handleVideoDoubleClick(e.target)}
          />
        ) : content.imageUrl ? (
          <img
            src={`http://localhost:5000${content.imageUrl}`} // Adjust field name based on your backend
            alt={content.user?.username}
            className="max-h-full max-w-full object-contain"
          />
        ) : null}

        <div className="absolute top-4 left-4 flex items-center space-x-2 z-20 bg-black/70 p-2 rounded-lg">
          <div className="w-10 h-10 bg-gray-600 rounded-full"></div> {/* Placeholder for profile pic */}
          <div>
            <h3 className="text-white font-bold text-sm">{content.user?.username}</h3>
            <button className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded">
              Follow
            </button>
          </div>
        </div>

        <div className="absolute bottom-16 left-4 text-white z-20 bg-black/70 p-2 rounded-lg">
          <p className="text-sm text-gray-200">{content.caption || "Explore content"}</p>
        </div>

        {content.videoUrl && (
          <button
            className="absolute bottom-5 left-5 bg-black/60 text-white p-2 rounded-full z-20"
            onClick={() => setSoundOn(!soundOn)}
          >
            {soundOn ? "🔊" : "🔇"}
          </button>
        )}

        <div className="absolute right-4 bottom-20 flex flex-col gap-6 items-center text-white z-20">
          <button
            className="bg-white/20 rounded-full p-3 hover:bg-red-500/20 hover:scale-110 transition"
            onClick={handleLike}
          >
            ❤️
          </button>
          <span className="text-sm">{content.likes?.length || 0}</span>

          <button
            className="bg-white/20 rounded-full p-3 hover:bg-blue-500/20 hover:scale-110 transition"
            onClick={() => navigate(`/explore/detail/${content._id}/comments`)}
          >
            💬
          </button>
          <span className="text-sm">{content.comments?.length || 0}</span>

          <button
            className="bg-white/20 rounded-full p-3 hover:bg-green-500/20 hover:scale-110 transition"
            onClick={handleShare}
          >
            🔗
          </button>
        </div>

        <button className="absolute top-4 right-4 text-white bg-black/60 p-2 rounded-full hover:bg-black/80 z-20">
          ⋮
        </button>
      </div>
    </div>
  );
};

export default ExploreDetail;