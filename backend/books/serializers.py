from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    seller_email = serializers.ReadOnlyField(source='seller.email')  # show seller email

    class Meta:
        model = Book
        fields = ['id', 'seller', 'seller_email', 'title', 'author', 'price', 'photo', 'created_at', 'updated_at']
        read_only_fields = ['seller']