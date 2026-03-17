# student_app/models.py
from django.db import models
from users.models import User  # import your custom User model

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    
    firstname = models.CharField(max_length=50)
    middlename = models.CharField(max_length=50, blank=True, null=True)
    lastname = models.CharField(max_length=50)
    student_class = models.CharField(max_length=20)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    fathername = models.CharField(max_length=100)
    mothename = models.CharField(max_length=100)
    address = models.TextField()
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # will be hashed
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.firstname} {self.middlename or ''} {self.lastname}"