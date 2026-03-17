# student_app/serializers.py
from rest_framework import serializers
from .models import Student
from users.models import User

class StudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = Student
        fields = [
            'id', 'firstname', 'middlename', 'lastname', 'student_class', 'profile_picture',
            'fathername', 'mothename', 'address', 'email', 'password', 'created_at', 'updated_at'
        ]

    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        # create linked User first
        user = User.objects.create_user(
            email=email,
            username=email,
            password=password,
            role='Student'
        )

        student = Student.objects.create(user=user, **validated_data)
        return student

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        email = validated_data.pop('email', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.user.set_password(password)
        if email:
            instance.user.email = email
            instance.user.username = email

        instance.user.save()
        instance.save()
        return instance