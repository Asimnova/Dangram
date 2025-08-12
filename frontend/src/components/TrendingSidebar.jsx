import { useState } from "react";

export default function TrendingSidebar() {
  const [trendingHashtags] = useState([
    "#photography",
    "#travel",
    "#fashion",
    "#food",
    "#fitness",
    "#nature",
  ]);

  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-4 shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Trending Hashtags</h3>
      <ul className="space-y-2">
        {trendingHashtags.map((hashtag, index) => (
          <li key={index} className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            {hashtag}
          </li>
        ))}
      </ul>
    </div>
  );
}