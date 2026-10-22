'use client'; // Client Component

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation'; 
import Image from 'next/image';
import Link from 'next/link';
import { Student } from '../../types';
import { fetchStudent, deleteStudent, generateAIReport } from '../../api';
import { error } from 'console';

export default function StudentDetailPage() {
  const params = useParams(); // Get the ID from the URL
  const router = useRouter();
  const id = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratingReport = async () => {
    setIsGenerating(true);
    
    try {
      const data = await generateAIReport(id);
      setAiReport(data.report);
    } catch (error) {
      console.error(error);
      alert('Failed to generate AI report.');
    } finally {
      setIsGenerating(false);
    }
  };


  // Fetch specific student from db
  useEffect(() => {
    fetchStudent(id)
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
  }, [id])

  // Delete function
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this student from the database?')) {
      try {
        // Tell Django to delete this ID
        await deleteStudent(id);

        // If successful, go back to the list
        router.push('/school/students')
      } catch (error) {
        console.error(error);
        alert('Failed to delete student.');
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 p-8 text-white">Loading...</div>;
  }

  // If no student was found after loading, trigger the 404 page
  if(!loading && !student) {
    notFound();
  }

  // If still loading, show a loader
  if (loading) {
    return <div className='min-h-screen bg-slate-950 p-8 text-white'>
        Loading...
    </div>
  }


  return (
    <div className="min-h-screen bg-slate-950 p-6 sm:p-8">
      
      <div className="max-w-2xl mx-auto mb-6">
        <Link
          href="/school/students"
          className="text-indigo-400 hover:underline"
        >
          ← Back to Students
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
          
          <div className="flex flex-col items-center text-center mb-8">
            <Image
              src={student!.photo}
              alt={`${student!.first_name} ${student!.last_name}`}
              width={128}
              height={128}
              priority
              className="w-32 h-32 rounded-full mb-4 border-4 border-slate-700 shadow-lg object-cover"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {student!.first_name} {student!.last_name}
            </h1>
            <p className="text-gray-400 text-sm mt-1">{student!.email}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 text-center">
              Student Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-indigo-950/50 border border-indigo-900/50 rounded-xl p-4 text-center">
                <p className="text-xs text-indigo-400 font-medium uppercase mb-1">Class</p>
                <p className="text-xl font-bold text-indigo-200">{student!.student_class}</p>
              </div>

              <div className="bg-purple-950/50 border border-purple-900/50 rounded-xl p-4 text-center">
                <p className="text-xs text-purple-400 font-medium uppercase mb-1">Age</p>
                <p className="text-xl font-bold text-purple-200">{student!.age}</p>
              </div>

              <div className={`rounded-xl p-4 text-center border ${student!.gender === 'Female' ? 'bg-pink-950/50 border-pink-900/50' : 'bg-blue-950/50 border-blue-900/50'}`}>
                <p className={`text-xs font-medium uppercase mb-1 ${student!.gender === 'Female' ? 'text-pink-400' : 'text-blue-400'}`}>Gender</p>
                <p className={`text-xl font-bold ${student!.gender === 'Female' ? 'text-pink-200' : 'text-blue-200'}`}>{student!.gender}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
              <span className="text-sm text-gray-400">Student ID</span>
              <span className="font-mono font-bold text-gray-200">#{student!.id}</span>
            </div>

            {/* AI Report Section  */}
            <div className='mt-6'>
              <button
                onClick={handleGeneratingReport}
                disabled={isGenerating}
                className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors shadow-lg disabled:opacity-50'
              >
                {isGenerating ? '🧠 Analyzing Data...' : '✨ Generate AI Report'}
              </button>

              {aiReport && (
                <div className="mt-4 p-4 bg-indigo-950/50 border border-indigo-900/50 rounded-xl text-indigo-200">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                      🤖 AI Analysis
                  </h3>
                  <p className='tezxt-sm leading-relaxed'>{aiReport}</p>
                </div>
              )}
            </div>

            {/* Edit&Delete Button */}
            <div className='mt-6 flex justify-end gap-3'>
                <Link
                    href={`/school/students/${student?.id}/edit`}
                    className='bg-indigo-600/10 text-indigo-400 border border-indigo-900/50 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium'
                >
                    Edit Student
                </Link>
                <button
                    onClick={handleDelete}
                    className='bg-red-600/10 text-rose-400 border border-red-900/50 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium'
                >
                    Delete Student
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}