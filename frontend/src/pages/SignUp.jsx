import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!form.name.trim()) {
      setError('Name is required.');
      return false;
    }
    if (form.name.length < 2) {
      setError('Name must be at least 2 characters long.');
      return false;
    }
    if (!form.username.trim()) {
      setError('Username is required.');
      return false;
    }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username.trim())) {
      setError('Username must be 3-20 characters, alphanumeric or underscore only.');
      return false;
    }
    if (!form.email.trim()) {
      setError('Email is required.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('Invalid email format.');
      return false;
    }
    if (!form.password) {
      setError('Password is required.');
      return false;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
      return false;
    }
    return true;
  };

  const submit = async e => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        ...form,
        name: form.name.trim(),
        username: form.username.trim(),
        email: form.email.trim()
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form 
        onSubmit={submit} 
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96 space-y-4 border border-gray-300 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white" 
          onChange={e => setForm({ ...form, name: e.target.value })} 
          required
        />
        <input 
          type="text" 
          placeholder="Username" 
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white" 
          onChange={e => setForm({ ...form, username: e.target.value })} 
          required
        />
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
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
        <a 
          href="http://localhost:5000/api/auth/google" 
          className="block w-full text-center bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
        >
          Sign up with Google
        </a>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Already have an account? <Link to="/" className="underline text-indigo-600 dark:text-indigo-400">Sign In</Link>
        </p>
      </form>
    </div>
  );
}