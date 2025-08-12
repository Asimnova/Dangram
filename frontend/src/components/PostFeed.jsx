import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PostFeed({ searchTerm }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found, please sign in');
          return;
        }
        const res = await axios.get('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.caption?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state (simplified, real app should fetch updated post)
      setPosts(posts.map(post => 
        post._id === postId ? { ...post, likes: [...(post.likes || []), { _id: 'temp' }] } : post // Placeholder update
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (postId, text) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, { text }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state (simplified)
      setPosts(posts.map(post => 
        post._id === postId ? { ...post, comments: [...(post.comments || []), { user: 'temp', text, createdAt: new Date() }] } : post
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/posts/${postId}/share`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.map(post => 
        post._id === postId ? { ...post, shares: (post.shares || 0) + 1 } : post
      ));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-800 dark:text-white">Loading...</p>;

  return (
    <div className="space-y-4">
      {filteredPosts.map(post => (
        <div key={post._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="font-bold text-gray-800 dark:text-white">{post.user}</p>
          <img src={post.img} alt="post" className="w-full h-auto mt-2" />
          <p className="text-gray-600 dark:text-gray-300 mt-2">{post.caption}</p>
          <div className="flex space-x-4 mt-2">
            <button
              onClick={() => handleLike(post._id)}
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              Like ({post.likes?.length || 0})
            </button>
            <button
              onClick={() => {
                const text = prompt('Enter your comment:');
                if (text) handleComment(post._id, text);
              }}
              className="text-green-500 dark:text-green-400 hover:underline"
            >
              Comment ({post.comments?.length || 0})
            </button>
            <button
              onClick={() => handleShare(post._id)}
              className="text-purple-500 dark:text-purple-400 hover:underline"
            >
              Share ({post.shares || 0})
            </button>
          </div>
          {post.comments && post.comments.length > 0 && (
            <div className="mt-2">
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">Comments:</h4>
              {post.comments.map((comment, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400 text-sm">
                  {comment.text}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
      {filteredPosts.length === 0 && <p className="text-gray-800 dark:text-white">No posts to show</p>}
    </div>
  );
}