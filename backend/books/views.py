from rest_framework import viewsets, permissions
from .models import Book
from .serializers import BookSerializer
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    @action(detail=True, methods=['post'])
    def buy(self, request, pk=None):
        book = self.get_object()

        if book.buyer:
            return Response({"detail": "Book already sold"}, status=status.HTTP_400_BAD_REQUEST)

        book.buyer = request.user
        book.is_sold = True
        book.save()

        return Response({"detail": f"You bought {book.title} successfully!"})