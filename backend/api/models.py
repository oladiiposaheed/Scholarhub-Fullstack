from django.db import models

# Create your models here.

class Student(models.Model):

    GENDER_CHOICES = [
        ('Male', 'Male'), ('Female', 'Female')
    ]
    
    CLASS_CHOICES = [
        ('JSS1', 'JSS1'),
        ('JSS2', 'JSS2'),
        ('JSS3', 'JSS3'),
        ('SS1', 'SS1'),
        ('SS2', 'SS2'),
        ('SS3', 'SS3'),
    ]
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    student_class = models.CharField(max_length=10, choices=CLASS_CHOICES) 
    age = models.IntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    photo = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    