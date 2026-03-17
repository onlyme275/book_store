from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    seller_email = serializers.EmailField(source='seller.email', read_only=True)
    buyer_email = serializers.EmailField(source='buyer.email', read_only=True)

    class Meta:
        model = Book
        fields = '__all__'
        read_only_fields = ['seller', 'buyer'] 