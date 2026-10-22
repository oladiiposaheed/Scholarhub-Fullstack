import { error } from "console";

const API_URL = 'http://127.0.0.1:8000/api/students/';

// Helper: Get the Token
function getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` }: {} ),
    };
}

// 1. Fetch all students
export async function fetchStudents() {
    const response = await fetch(API_URL, { 
        cache: 'no-store',
        headers: getAuthHeaders()    // add token 
    });
    if (!response.ok)
        throw new Error('Failed to fetch students');
    return response.json();
}

// 2. Create a new student (Send data TO Django)
export async function createStudent(studentData: any) {
    const response = await fetch(API_URL, {
        method: 'POST', // Sending data
        headers: getAuthHeaders(),
        body: JSON.stringify(studentData), // Convert JS object to JSON string
    });

    if (!response.ok) 
        throw new Error('Failed to add student');
    return response.json();
}

// 3. Fetch a single student by ID
export async function fetchStudent(id: string | number) {
    const response = await fetch(`${API_URL}${id}/`, { 
        cache: 'no-store',
        headers: getAuthHeaders()
    });
    if (!response.ok)
        throw new Error('Failed to fetch student');
    return response.json()
}

// 4. Delete a student by ID
export async function deleteStudent(id: string | number) {
    const response = await fetch(`${API_URL}${id}/`, {
        method: 'DELETE',  
        headers: getAuthHeaders()  
    });
    if (!response.ok) 
        throw new Error('Failed to delete student');
    return true
}

// 5. Update an existing student
export async function updateStudent(id: string | number, studentData: any) {
    const response = await fetch(`${API_URL}${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(studentData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Django Error Details:', errorData);
        throw new Error('Failed to update student');
    }
    return response.json();
}

// 6. Generate AI Report
export async function generateAIReport(id: string | number) {
    const response = await fetch(`${API_URL}${id}/generate-report/`, {
        method: 'POST',     // sending a request to generate
        headers: getAuthHeaders(),
    });
    if (!response.ok)
        throw new Error('Failed to generate AI report');
    return response.json();
}

// 7. Login User (Send credentials to Django, get Tokens back)
export async function loginUser(credentials: any) {
    const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Invalid username or password');
    }

    // Returns { access, refresh }
    return response.json() 
}

// 8. Register User (Signup)
export async function registerUser(userData: any) {
    const response = await fetch('http://127.0.0.1:8000/api/auth/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });

    if (!response.ok) { 
        const errorData = await response.json();
        console.error("Signup Error Details:", errorData);
        
        let errorMessage = 'Failed to create account.';
        if (typeof errorData === 'object') {
            const firstKey = Object.keys(errorData)[0];
            if (firstKey) {
                errorMessage = `${firstKey}: ${errorData[firstKey][0]}`;
            }
        }
        throw new Error(errorMessage);
    }
    return response.json();
}

// 9. Fetch Dashboard Stats
export async function fetchDashboardStats() {
    const response = await fetch('http://127.0.0.1:8000/api/dashboard-stats/', {
        cashe: 'no-store',
        headers: getAuthHeaders()    // Use the token
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
}