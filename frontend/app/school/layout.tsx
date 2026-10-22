'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SchoolLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if token exists whenever the page changes
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);
    }, [pathname]);

    // 1. If we are on the login page, ONLY show the login form 
    if (pathname === '/school/login' || pathname === '/school/signup') {
        return <>{children}</>;
    }

    // 2. Otherwise, show the Navbar, the page content, and the Footer
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            {/* Header / Navbar */}
            <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link 
                        href='/school'
                        className="text-xl font-bold text-white flex items-center gap-2"
                    >
                        🎓 ScholarHub
                    </Link>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex gap-6">
                        <Link 
                            href='/school'
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href='/school/students'
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Student
                        </Link>
                    </nav>

                    {/* Login/Logout Button */}
                    <div className="flex gap-4">
                        {isLoggedIn ? (
                            <button 
                                onClick={() => {
                                    localStorage.removeItem('access_token');
                                    localStorage.removeItem('refresh_token');
                                    window.location.href = '/school/login'; 
                                }}
                                className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link 
                                href="/school/login" 
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center text-gray-500 text-sm">
                <p>© 2026 ScholarHub. Built for the Fullstack Portfolio.</p>
            </footer>
        </div>
    );
}