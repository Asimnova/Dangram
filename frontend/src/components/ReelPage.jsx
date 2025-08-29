import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, Share2, Volume2, VolumeX } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/reels";

export default function ReelsPage() {
  const [muted, setMuted] = useState(true);
  const [reels, setReels] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setReels(res.data));
  }, []);

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (video.paused) video.play();
    else video.pause();
  };

  const handleLike = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API_URL}/${id}/like`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setReels((prev) => prev.map((r) => (r._id === id ? res.data : r)));
  };

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory">
      {reels.map((reel, index) => (
        <div key={reel._id} className="h-screen w-full flex items-center justify-center relative snap-start">
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={`http://localhost:5000${reel.videoUrl}`}
            className="h-full w-full object-cover"
            muted={muted}
            loop
            autoPlay
            onClick={() => togglePlay(index)}
          />

          {/* Overlay Content */}
          <div className="absolute bottom-20 left-6 text-white">
            <h3 className="font-bold">@{reel.user?.username}</h3>
            <p className="text-sm">{reel.caption}</p>
          </div>

          {/* Buttons */}
          <div className="absolute bottom-20 right-6 flex flex-col items-center space-y-4 text-white">
            <button className="flex flex-col items-center" onClick={() => handleLike(reel._id)}>
              <Heart size={28} />
              <span className="text-sm">{reel.likes.length}</span>
            </button>
            <button className="flex flex-col items-center">
              <MessageCircle size={28} />
              <span className="text-sm">{reel.comments.length}</span>
            </button>
            <button><Share2 size={28} /></button>
            <button onClick={() => setMuted(!muted)}>
              {muted ? <VolumeX size={28} /> : <Volume2 size={28} />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

