// Students List Page

'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Student } from "../types";
import { fetchStudents } from "../api";
import { error } from "console";


export default function StudentsPage() {

    // State to hold the students
    const [studentList, setStudentList] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Load students from Django when the page loads
    useEffect(() => {
        fetchStudents()
            .then((data) => {
                setStudentList(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    // Filter the list based on what the user typed
    const filteredStudents = studentList.filter((student) => {
        const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    })
    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Students</h1>
                        <p className="text-gray-400">
                        {studentList.length} students enrolled
                        </p>
                    </div>
                    <Link
                        href="/school/students/add"
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
                    >
                        + Add Student
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <input 
                        type="text" 
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStudents.map((student, index) => (
                        <div
                            key={student.id}
                            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-all"
                        >
                            <Image 
                                src={student.photo ||  `https://randomuser.me/api/portraits/lego/1.jpg`}
                                alt={student.first_name}
                                width={96}
                                height={96}
                                priority={index < 3}
                                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-slate-700 object-cover"
                            />

                            <h2 className="text-white font-bold text-lg">
                                {student.first_name} {student.last_name}
                            </h2>
                            <p className="text-gray-400 mb-4 text-sm">{student.email}</p>

                            <div className="flex justify-center gap-2 flex-wrap">
                                <span className="bg-indigo-950/50 text-indigo-300 text-xs font-medium px-3 py-1 rounded-full border border-indigo-900/50">
                                    {student.student_class}
                                </span>
                                <span className="bg-purple-950/50 text-purple-300 text-xs font-medium px-3 py-1 rounded-full border border-purple-900/50">
                                    Age {student.age}
                                </span>
                                <span
                                    className={`text-xs font-medium px-3 py-1 rounded-full border ${
                                        student.gender === 'Female'
                                        ? 'bg-pink-950/50 text-pink-300 border-pink-900/50'
                                        : 'bg-blue-950/50 text-blue-300 border-blue-900/50'
                                    }`}
                                >
                                    {student.gender}
                                </span>
                            </div>

                            <Link
                                href={`/school/students/${student.id}`}
                                className="mt-2 inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                            >
                            View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}