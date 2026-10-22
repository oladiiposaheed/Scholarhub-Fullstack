'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchDashboardStats } from './api';

export default function DashboardPage() {

    // State to hold the stats from Django
    const [stats, setStats] = useState({
        total_students: 0,
        male_students: 0,
        female_students: 0,
    });
    const [loading, setLoading] = useState(true);

    const [studentCount, setStudentCount] = useState<number | string>('...');

    useEffect(() => {
        fetchDashboardStats()
        .then((data) => {
            setStats(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error('Failed to load stats', err);
            setLoading(false);
        });
    }, []);
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your school data</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Students */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
          <p className="text-sm font-medium text-gray-400 mb-1">Total Students</p>
          <p className="text-4xl font-bold text-white mb-4">
            {loading ? '...' : stats.total_students}
          </p>
          <Link href="/school/students" className="text-sm text-indigo-400 hover:underline">
            View Students →
          </Link>
        </div>

        {/* Card 2: Male Students */}
        <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6'>
            <p className='text-sm font-medium text-blue-400 mb-1'>Male Students</p>
            <p className='text-4xl font-bold text-white mb-4'>
                {loading ? '...' : stats.male_students}
            </p>
            <span className="text-sm text-gray-500">Enrolled</span>
        </div>

        {/* Card 2: Teachers */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
          <p className="text-sm font-medium text-gray-400 mb-1">Total Teachers</p>
          <p className="text-4xl font-bold text-white mb-4">15</p>
          <button className="text-sm text-indigo-400 hover:underline cursor-not-allowed">
            See later
          </button>
        </div>

        {/* Card 3: Female Students */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-sm font-medium text-pink-400 mb-1">Female Students</p>
          <p className="text-4xl font-bold text-white mb-4">
            {loading ? '...' : stats.female_students}
          </p>
          <span className="text-sm text-gray-500">Enrolled</span>
        </div>

        {/* Card 3: AI Reports */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
          <p className="text-sm font-medium text-gray-400 mb-1">AI Reports Generated</p>
          <p className="text-4xl font-bold text-white mb-4">48</p>
          <button className="text-sm text-indigo-400 hover:underline cursor-not-allowed">
            See later
          </button>
        </div>
        
      </div>
    </div>
  );
}