import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExplorePage = () => {
  const [exploreContent, setExploreContent] = useState([]);
  const [visibleContent, setVisibleContent] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const observerRef = useRef(null);
  const token = localStorage.getItem("token");

  // ✅ Run once on mount
  useEffect(() => {
    const cachedContent = JSON.parse(localStorage.getItem("exploreContent") || "[]");
    if (cachedContent.length > 0) {
      setExploreContent(cachedContent);
      setVisibleContent(cachedContent.slice(0, 9));
    } else {
      fetchInitialContent();
    }
  }, []);  // <-- fixed: only run once

  const fetchInitialContent = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reels", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userContent = response.data || [];
      setExploreContent(userContent);
      setVisibleContent(userContent.slice(0, 9));
      localStorage.setItem("exploreContent", JSON.stringify(userContent));
    } catch (error) {
      console.error("Error fetching explore content:", error);
    }
  };

  const loadMoreContent = () => {
    const nextPage = page + 1;
    const nextItems = exploreContent.slice(0, nextPage * 9);
    setVisibleContent(nextItems);
    setPage(nextPage);
  };

  const handleContentClick = (id) => {
    const selectedContent = exploreContent.find((item) => item._id === id);
    if (selectedContent) {
      navigate("/home/explore/detail", { state: { content: selectedContent } });
    }
  };

  // ✅ Separate effect for IntersectionObserver
  useEffect(() => {
    if (!exploreContent.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && exploreContent.length > visibleContent.length) {
          loadMoreContent();
        }
      },
      { threshold: 0.1 }
    );

    const loader = document.querySelector("#loader");
    if (loader) observerRef.current.observe(loader);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [exploreContent, visibleContent]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-4">Explore</h1>
      <div className="grid grid-cols-3 gap-1">
        {visibleContent.map((item) => (
          <div
            key={item._id}
            className="relative aspect-square cursor-pointer"
            onClick={() => handleContentClick(item._id)}
          >
            {item.videoUrl ? (
              <video
                src={`http://localhost:5000${item.videoUrl}`}
                className="w-full h-full object-cover rounded-lg"
                muted
                loop
                playsInline
                autoPlay
              />
            ) : item.imageUrl ? (
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.user?.username}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : null}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-white font-semibold">{item.user?.username}</span>
            </div>
          </div>
        ))}
        {exploreContent.length === 0 && (
          <p className="text-center col-span-3">Loading explore content...</p>
        )}
        {visibleContent.length < exploreContent.length && (
          <div id="loader" className="col-span-3 text-center py-4">
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
