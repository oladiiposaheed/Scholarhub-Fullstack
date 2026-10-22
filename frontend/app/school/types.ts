// ScholarHub — Types

export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    photo: string | null;
    student_class: string;
    age: number;
    gender: 'Male' | 'Female';
}