from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

# CRUD for Users
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-created_at')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

# Login API
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=400)

    user = authenticate(username=email, password=password)
    
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        user_data = {
            "id": user.id,
            "email": user.email,
            "role": user.role,
        }
        
        # If user is a student, include student details from student_profile
        if user.role == "Student" and hasattr(user, 'student_profile'):
            user_data["firstname"] = user.student_profile.firstname
            user_data["lastname"] = user.student_profile.lastname

        return Response({
            "token": token.key,
            "user": user_data
        })
    return Response({"error": "Invalid credentials"}, status=400)