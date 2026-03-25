from django.urls import path
from .views import AIChatView

urlpatterns = [
    path('messages/', AIChatView.as_view(), name='ai_chat'),
]