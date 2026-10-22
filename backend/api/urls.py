from django.urls import path
from .views import (
    StudentListCreateView, 
    StudentDetailView, 
    GenerateAIReportView,
    RegisterView,
    DashboardStatsView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # URL: /api/students/
    path('students/', StudentListCreateView.as_view(), name='student-list'),
    
    # URL: /api/students/1/ (where 1 is the student ID)
    path('students/<int:pk>/', StudentDetailView.as_view(), name='student-detail'),
    
    # AI endpoint
    path('students/<int:pk>/generate-report/', GenerateAIReportView.as_view(), name='generate-ai-report'),
    path('auth/signup/', RegisterView.as_view(), name='signup'),
    
    #Login & Refresh URLs
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Dashboard Stats URL
    path('dashboard-stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
]