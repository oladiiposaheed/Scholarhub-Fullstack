'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createStudent } from '../../api';

export default function AddStudentPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentClass: '',
    age: '',
    gender: '',
  });

  // State to hold error messages
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentClass: '',
    age: '',
    gender: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Update the form data
    setFormData({ ...formData, [name]: value });

    // Clear the error for this field when the user types
    setErrors({ ...errors, [name]: '' });
  };

  // Validation logic 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create an object to hold any new errors
    const newErrors = { firstName: '', lastName: '', email: '', studentClass: '', age: '', gender: '' };
    let hasError = false;

    // Check each field
    if (formData.firstName.trim() === '') {
        newErrors.firstName = 'First name is required';
        hasError = true;
    }
    if (formData.lastName.trim() ==='') {
        newErrors.lastName = 'Last name is required';
        hasError = true;
    }
    if (formData.email.trim() === '') {
        newErrors.email = 'Email is required';
        hasError = true;
    }
    if (formData.studentClass.trim() === '') {
        newErrors.studentClass = 'Please enter a class';
        hasError = true;
    }
    if (formData.age === '') {
        newErrors.age = 'Age is required';
        hasError = true;
    }
    if (formData.gender === '') {
        newErrors.gender = 'Please select a gender';
        hasError = true;
    }

    // If there is an error, update the state and STOP (return)
    if (hasError) {
        setErrors(newErrors);
        return;
    }

    // PREPARE THE DATA FOR DJANGO
    // Create the new student object
    const newStudentData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        student_class: formData.studentClass,
        age: Number(formData.age),
        gender: formData.gender as 'Male' | 'Female',

        // Generate a random photo based on gender
        photo: `https://randomuser.me/api/portraits/${formData.gender === 'Male' ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`,   
    };

    try {
      // SEND IT TO DJANGO
      await createStudent(newStudentData);

      // If successful, redirect to the list page
      router.push('/school/students');
    } catch (error) {
      console.error('Failed to save to Django:', error);
      alert('Something went wrong.');
    };
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      
      {/* Back link */}
      <div className="max-w-md mx-auto mb-6">
        <Link href="/school/students" className="text-indigo-400 hover:underline">
          ← Back to Students
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900">
          <h1 className="text-2xl font-bold text-white">Add Student</h1>
          <p className="text-gray-400 text-sm mt-1">Enter the student details below</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* First Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full bg-slate-950 text-white px-3 py-2 rounded-lg border focus:outline-none transition-colors ${
                errors.firstName ? 'border-red-500' : 'border-slate-800 focus:border-indigo-500'
              }`}
            />
            {/* Show error if it exists */}
            {errors.firstName && <p className='text-red-500 text-xs mt-1'>{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full bg-slate-950 text-white px-3 py-2 rounded-lg border focus:outline-none transition-colors ${
                errors.lastName ? 'border-red-500' : 'border-slate-800 focus:border-indigo-500'
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-slate-950 text-white px-3 py-2 rounded-lg border focus:outline-none transition-colors ${
                errors.email ? 'border-red-500' : 'border-slate-800 focus:border-indigo-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Class</label>
            <select
              name="studentClass"
              value={formData.studentClass}
              onChange={handleChange}
              className={`w-full bg-slate-950 text-white px-3 py-2 rounded-lg border focus:outline-none transition-colors appearance-none ${
                errors.studentClass ? 'border-red-500' : 'border-slate-800 focus:border-indigo-500'
              }`}
            >
              <option value="">Select Class</option>
              <option value="JSS1">JSS1</option>
              <option value="JSS2">JSS2</option>
              <option value="JSS3">JSS3</option>
              <option value="SS1">SS1</option>
              <option value="SS2">SS2</option>
              <option value="SS3">SS3</option>
            </select>
            {errors.studentClass && <p className='text-red-500 text-xs mt-1'>{errors.studentClass}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full bg-slate-950 text-white px-3 py-2 rounded-lg border focus:outline-none transition-colors ${
                errors.age ? 'border-red-500' : 'border-slate-800 focus:border-indigo-500'
              }`}
            />
            {errors.age && <p className='text-red-500 text-xs mt-1'>{errors.age}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Gender</label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                Male
              </label>
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                Female
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30"
            >
              Save Student
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}