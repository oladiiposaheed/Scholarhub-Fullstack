from rest_framework import generics
from .models import Student
from .serializers import StudentSerializer
import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status
from .serializers import StudentSerializer, RegisterSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q

# 1. View: Student List & Create
class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all().order_by('-id') # Newest first
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
    
# 2. View: Student Detail, Update & Delete
class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

# View: Generate AI Report
# Fetches student from DB, sends to FastAPI, returns the AI report
class GenerateAIReportView(APIView):
    
    def post(self, request, pk):
        
        # 1. Find the student in the Django database
        student = get_object_or_404(Student, pk=pk)
        
        # 2. Prepare the data exactly as FastAPI expects it
        payload = {
            'name': f'{student.first_name} {student.last_name}',
            'student_class': student.student_class,
            'age': student.age
        }
        
        try:
            # 3. Send the data to FastAPI
            response = requests.post('http://127.0.0.1:8001/generate-report/', json=payload)
            response.raise_for_status()  # Check for errors
            
            # 4. Return FastAPI's response back to Next.js
            return Response(response.json(), status=status.HTTP_200_OK)
        
        except requests.exceptions.RequestException as e:
            return Response(
                {'error': 'Failed to connect to AI service. Is FastAPI running?'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
# View: User Signup
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
    
# View: Dashboard Stats
class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        
        # Get the total number of students
        total = Student.objects.count()
        
        # Get the count of males and females
        male = Student.objects.filter(gender='Male').count()
        female = Student.objects.filter(gender='Female').count()
        
        # Return the summary as JSON
        return Response ({
            'total_students': total,
            'male_students': male,
            'female_students': female
        }, status=status.HTTP_200_OK)
    