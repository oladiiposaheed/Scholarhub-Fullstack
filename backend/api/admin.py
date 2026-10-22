from django.contrib import admin
from .models import Student

# Register your models here.

class StudentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'student_class', 'age', 'gender')
    search_fields = ('first_name', 'last_name', 'email')
    list_filter = ('student_class', 'gender')
    ordering = ('last_name',)
    
# Register the model
admin.site.register(Student, StudentAdmin)
