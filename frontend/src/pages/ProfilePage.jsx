import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });
  const username = localStorage.getItem('username') || 'Guest';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const userPostsData = res.data.filter(post => post.user === username);
        setUserPosts(userPostsData);
        setStats({
          posts: userPostsData.length,
          followers: 0, // Placeholder, requires follower model
          following: 0 // Placeholder, requires following model
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-3xl">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            {/* Placeholder for profile pic */}
            <img src="https://via.placeholder.com/96" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{username}</h2>
            <div className="flex space-x-6 mt-2">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300">Posts</p>
                <p className="font-bold text-gray-800 dark:text-white">{stats.posts}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300">Followers</p>
                <p className="font-bold text-gray-800 dark:text-white">{stats.followers}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300">Following</p>
                <p className="font-bold text-gray-800 dark:text-white">{stats.following}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {userPosts.map(post => (
            <div key={post._id} className="relative">
              <img src={post.img} alt="post" className="w-full h-48 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                <span className="text-white">Likes: {post.likes?.length || 0}</span>
              </div>
            </div>
          ))}
        </div>
        {loading && <p className="text-center text-gray-800 dark:text-white">Loading...</p>}
        {!loading && userPosts.length === 0 && <p className="text-center text-gray-800 dark:text-white">No posts yet</p>}
      </div>
    </div>
  );
}