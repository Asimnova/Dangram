import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostPage() {
  const [form, setForm] = useState({ user: "", img: "", caption: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve token
    if (!token) {
      setMessage("Please sign in to create a post.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/posts", form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token to header
        },
      });
      setMessage("Post created successfully!");
      setForm({ user: "", img: "", caption: "" });
      navigate("/home"); // Navigate back to feed after success
    } catch (err) {
      setMessage("Error creating post: " + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-6">
          Create a New Post
        </h2>
        {message && (
          <p
            className={`text-center p-3 rounded-lg mb-6 font-medium ${
              message.includes("success")
                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={form.user}
              onChange={(e) => setForm({ ...form, user: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="url"
              placeholder="Enter image URL"
              value={form.img}
              onChange={(e) => setForm({ ...form, img: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Caption
            </label>
            <textarea
              placeholder="Write a caption..."
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2"
          >
            Share Post
          </button>
        </form>
      </div>
    </div>
  );
}