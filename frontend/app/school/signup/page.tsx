'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '../api';

export default function SignupPAge() {
    const router = useRouter();

    // State for the form
    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '', // Must match Django's field name
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle typing in the inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        await registerUser(formData);

        // If successful, redirect to the login page
      alert('Account created successfully! Please log in.');
      router.push('/school/login');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-white text-center mb-6">
                Create an Account
            </h1>

            {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleSignup} className='space-y-4'>
            <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-slate-950 text-white px-4 py-3 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-950 text-white px-4 py-3 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-950 text-white px-4 py-3 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full bg-slate-950 text-white px-4 py-3 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link href="/school/login" className="text-indigo-400 hover:underline">
            Log in
          </Link>
        </p>
        </div>
    </div>
  )

}
