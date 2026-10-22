'use client'

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { loginUser } from "../api"


export default function LoginPage() {
    const router = useRouter();

    // State for the form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // The Trigger
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Send data to Django
            const data = await loginUser({ username, password });

            // 🎫 Save tokens in localStorage
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            //Redirect to the protected students page
            router.push('/school/students');
        } catch (err: any) {
            // If Django says "Invalid credentials"
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
                <h1 className="text-2xl font-bold text-white text-center mb-6">
                    Login to ScholarHub
                </h1>

                {/* Show error if Django rejects the login */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                {/* The Form */}
                <form onSubmit={handleLogin} className="space-y-4">

                    {/* Username */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">USername</label>
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-slate-950 text-white px-4 py-3 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
                            required 
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950 text-white px-4 py-3 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Link to Signup */}
                <p className="text-gray-400 text-sm text-center mt-6">
                    Don't have an account?{' '}
                    <Link
                        href='/school/signup'
                        className="text-indigo-400 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}