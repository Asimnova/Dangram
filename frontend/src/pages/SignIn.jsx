import { useState, useEffect } from 'react'; // Added useEffect
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Signin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Use within Router context

  // Handle token from Google callback
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // Optionally fetch username (assuming a separate API call or set elsewhere)
      navigate('/home');
    }
  }, [location, navigate]);

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', form, {
        headers: { 'Content-Type': 'application/json' }
      });
      const token = res.data.token;
      const username = res.data.user.username; // Correct path
      if (!token || !username) {
        throw new Error('Invalid response from server');
      }
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      console.log('Stored in localStorage:', { token, username });
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      console.error('Signin error:', err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96 space-y-4 border border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Sign In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white" 
          onChange={e => setForm({ ...form, email: e.target.value })} 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white" 
          onChange={e => setForm({ ...form, password: e.target.value })} 
          required
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Sign In</button>
        <a href="http://localhost:5000/api/auth/google" className="block w-full text-center bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition">Sign in with Google</a>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">Don't have an account? <Link to="/signup" className="underline text-indigo-600 dark:text-indigo-400">Sign Up</Link></p>
      </form>
    </div>
  );
}