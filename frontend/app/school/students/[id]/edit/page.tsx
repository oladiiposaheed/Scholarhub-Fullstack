'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Student } from "../../../types"
import { fetchStudent, updateStudent } from "@/app/school/api"
import { error } from "console"


export default function EditStudentPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    // State: Holds form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        studentClass: '',
        age: '',
        gender: '',
    });

    // Update a specific student
    useEffect(() => {
        // Fetch the specific student from Django
        fetchStudent(id)
            .then((data) => {
                setFormData({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    studentClass: data.student_class,
                    age: String(data.age),
                    gender: data.gender,
                });
            })
            .catch((error) => {
                console.error(error);
                router.push('/school/students');
            })
    }, [id, router]);

    // Handler: Update state when typing
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handler: Save updates to localStorage
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Prepare the data for Django
        const updateData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            student_class: formData.studentClass,
            age: Number(formData.age),
            gender: formData.gender,
        };

        try {
            await updateStudent(id, updateData);

            // Go back to detail page on success
            router.push(`/school/students/${id}`)
        } catch (error) {
            console.error(error);
            alert('Failed to update student.');
        }
    }   

    // Student form
    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <div className="max-w-md mx-auto mb-6">
                <Link
                    href={`/school/students/${id}`}
                    className="text-indigo-400 hover:underline"
                >
                    ← Back to Student
                </Link>
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-slate-900 p-6 rounded-xl space-y-4">
                <h1 className="text-2xl text-white">Edit Student</h1>

                {/* First Name */}
                <div>
                    <label className="block text-gray-400 mb-2">First Name</label>
                    <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-slate-950 text-white p-3 rounded-lg border border-slate-800"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-gray-400 mb-2">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-slate-950 text-white p-3 rounded-lg border border-slate-800"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input 
                        type="email" name="email" value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-950 text-white p-3 rounded-lg border border-slate-800" 
                    />
                    
                </div>

                {/* Class */}
                <div>
                    <label className="block text-gray-400 mb-2">Class</label>
                    <select 
                        name="studentClass" 
                        value={formData.studentClass}
                        onChange={handleChange}
                        className="w-full bg-slate-950 text-white p-3 rounded-lg border border-slate-800 appearance-none"       
                    >
                        <option value="">Select Class</option>
                        <option value="JSS1">JSS1</option>
                        <option value="JSS2">JSS2</option>
                        <option value="JSS3">JSS3</option>
                        <option value="SS1">SS1</option>
                        <option value="SS2">SS2</option>
                        <option value="SS3">SS3</option>
                    </select>
                </div>

                {/* Age */}
                <div>
                    <label className="block text-gray-400 mb-2">Age</label>
                    <input
                        type="number" name="age" value={formData.age}
                        onChange={handleChange}
                        className="w-full bg-slate-950 text-white p-3 rounded-lg border border-slate-800"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-gray-400 mb-2">Gender</label>
                    <div className="flex gap-6 mt-2">
                        <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input
                                type="radio" name="gender" value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                                className="w-4 h-4 text-indigo-600"
                            />
                            Male
                        </label>
                        <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input
                                type="radio" name="gender" value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                                className="w-4 h-4 text-indigo-600"
                            />
                            Female
                        </label>
                    </div>
                </div>
                
                {/* Save Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors mt-4"
                >
                    Update Student
                </button>
            </form>
        </div>
    )

}