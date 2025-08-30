import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReelCommentPage() {
  const { id } = useParams(); // reel id
  const [reel, setReel] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reels/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReel(res.data);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    };
    fetchComments();
  }, [id, token]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/reels/${id}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, res.data]); // add new comment
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="mr-3 text-lg">←</button>
        <h2 className="text-lg font-bold">Comments</h2>
      </div>

      {/* Reel Preview */}
      {reel && (
        <div className="flex items-center justify-center bg-black h-64 border-b border-gray-800">
          <video
            src={`http://localhost:5000${reel.videoUrl}`}
            className="h-full max-w-full object-cover rounded-lg"
            controls
          />
        </div>
      )}

      {/* Comments */}
      <div className="flex-1 overflow-y-scroll p-4 space-y-4">
        {comments.length > 0 ? (
          comments.map((c, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                {c.user?.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-bold">@{c.user?.username || "unknown"}</p>
                <p className="text-gray-300">{c.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        )}
      </div>

      {/* Add Comment */}
      <div className="p-4 border-t border-gray-800 flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-900 text-white outline-none"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Post
        </button>
      </div>
    </div>
  );
}
