// ScholarHub — Student Data

import { Student } from "./types";

export const initialstudents: Student[] = [
    {
    id: 1,
    firstName: 'Fatimah',
    lastName: 'Ibrahim',
    email: 'fatimah@school.edu',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    class: 'SS3',
    age: 17,
    gender: 'Female',
  },
  {
    id: 2,
    firstName: 'Blessing',
    lastName: 'Okafor',
    email: 'blessing@school.edu',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    class: 'SS3',
    age: 17,
    gender: 'Female',
  },
  {
    id: 3,
    firstName: 'Ali',
    lastName: 'Mohammed',
    email: 'ali@school.edu',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    class: 'SS3',
    age: 18,
    gender: 'Male',
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Adeyemi',
    email: 'david@school.edu',
    photo: 'https://randomuser.me/api/portraits/men/4.jpg',
    class: 'SS2',
    age: 16,
    gender: 'Male',
  },
  {
    id: 5,
    firstName: 'Hawwa',
    lastName: 'Yusuf',
    email: 'hawwa@school.edu',
    photo: 'https://randomuser.me/api/portraits/women/5.jpg',
    class: 'SS2',
    age: 16,
    gender: 'Female',
  },
  {
    id: 6,
    firstName: 'Grace',
    lastName: 'Peters',
    email: 'grace@school.edu',
    photo: 'https://randomuser.me/api/portraits/women/6.jpg',
    class: 'SS2',
    age: 16,
    gender: 'Female',
  },
  {
    id: 7,
    firstName: 'Ibrahim',
    lastName: 'Sani',
    email: 'ibrahim@school.edu',
    photo: 'https://randomuser.me/api/portraits/men/7.jpg',
    class: 'SS2',
    age: 16,
    gender: 'Male',
  },
  {
    id: 8,
    firstName: 'Emeka',
    lastName: 'Nwosu',
    email: 'emeka@school.edu',
    photo: 'https://randomuser.me/api/portraits/men/8.jpg',
    class: 'SS1',
    age: 15,
    gender: 'Male',
  },
  {
    id: 9,
    firstName: 'Zainab',
    lastName: 'Bello',
    email: 'zainab@school.edu',
    photo: 'https://randomuser.me/api/portraits/women/9.jpg',
    class: 'SS1',
    age: 15,
    gender: 'Female',
  },
  {
    id: 10,
    firstName: 'Esther',
    lastName: 'Johnson',
    email: 'esther@school.edu',
    photo: 'https://randomuser.me/api/portraits/women/10.jpg',
    class: 'SS1',
    age: 15,
    gender: 'Female',
  },
  {
    id: 11,
    firstName: 'Musa',
    lastName: 'Garba',
    email: 'musa@school.edu',
    photo: 'https://randomuser.me/api/portraits/men/11.jpg',
    class: 'SS1',
    age: 15,
    gender: 'Male',
  },
  {
    id: 12,
    firstName: 'Samuel',
    lastName: 'Ojo',
    email: 'samuel@school.edu',
    photo: 'https://randomuser.me/api/portraits/men/12.jpg',
    class: 'SS1',
    age: 15,
    gender: 'Male',
  },
];

//  Helper function to get students
export function getStudents(): Student[] {

  // If running on the server, just return the initial data
  if (typeof window === 'undefined')
    return initialstudents;

  const saved = localStorage.getItem('scholarhub_students');
  return saved ? JSON.parse(saved) : initialstudents;
}

// Helper function to save students
export function saveStudents(newStudents: Student[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('scholarhub_students', JSON.stringify(newStudents));
  }
}
