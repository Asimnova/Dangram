import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header with Search Bar */}
      <div className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 p-4">
        <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute right-3 top-2 text-gray-400" />
        </form>
      </div>

      {/* Trending Hashtags */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Trending Hashtags</h2>
        <div className="grid grid-cols-2 gap-2">
          {["#photography", "#travel", "#fashion", "#food", "#fitness", "#nature"].map((hashtag) => (
            <button
              key={hashtag}
              className="bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition"
              onClick={() => setSearchTerm(hashtag.replace("#", "") || searchTerm)}
            >
              {hashtag}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results / Suggestions */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Suggestions</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Dynamic content will be populated here */}
          {[...Array(9)].map((_, index) => (
            <div key={index} className="relative">
              <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Content {index + 1}</span>
              </div>
              <p className="mt-2 text-sm text-center text-gray-400">User{index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;