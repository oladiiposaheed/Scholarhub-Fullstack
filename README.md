# 🎓 ScholarHub - Fullstack School Management System

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)

A modern, production-ready, full-stack application built to manage school data, track student statistics, and generate AI-powered student reports.

This project utilizes a **Microservices Architecture** to separate concerns between the Frontend, the Core Backend, and the AI Service.

---

## 🏗️ Architecture Flow

1. **Next.js** requests data from the API using a secure JWT Token.
2. **Django** validates the token, queries the SQLite database, and returns the data.
3. When an AI Report is requested, **Django** securely fetches the student's data and sends it to **FastAPI**.
4. **FastAPI** processes the data and returns a generated report back to the user.

---

## ✨ Key Features

- **🔒 Secure Authentication:** Full Signup/Login flow using JWT (JSON Web Tokens).
- **🛡️ Protected Routes:** Next.js Layout bouncers prevent unauthorized access to the dashboard.
- **📊 Real-time Dashboard:** Django calculates database statistics (Total, Male, Female students) efficiently.
- **📝 Full CRUD Operations:** Create, Read, Update, and Delete student records.
- **🔍 Instant Search:** Filter students by name instantly on the frontend.
- **🧠 AI Integration:** Generates custom student performance reports via a FastAPI microservice.

---

## 🛠️ Tech Stack

| Service        | Technology                                     | Purpose                                                                                   |
| :------------- | :--------------------------------------------- | :---------------------------------------------------------------------------------------- |
| **Frontend**   | Next.js (App Router), TypeScript, Tailwind CSS | Beautiful, responsive UI with protected routes and JWT authentication.                    |
| **Backend**    | Django, Django REST Framework, SimpleJWT       | Core database, user authentication, and secure CRUD API.                                  |
| **AI Service** | FastAPI, Python                                | A dedicated microservice that receives student data and generates AI performance reports. |

---

## 🚀 How to Run Locally

This project requires **three separate terminals** to run all the services simultaneously.

### Prerequisites

- Node.js & npm
- Python 3.9+

### 1. Start the Backend (Django)

```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Start the AI Microservice (FastAPI)
bash
cd ai-service
python -m venv venv
# Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
(Runs on http://127.0.0.1:8001)

Start the Frontend (Next.js)
bash
cd frontend
npm install
npm run dev
(Runs on http://localhost:3000)

```

Core API Endpoints
Method Endpoint Description
POST /api/auth/signup/ Register a new admin user
POST /api/auth/login/ Login and receive JWT tokens
GET /api/dashboard-stats/ Fetch student statistics
GET /api/students/ Fetch all students (Requires Token)
POST /api/students/ Add a new student (Requires Token)
POST /api/students/<id>/generate-report/ Trigger the FastAPI AI Service
