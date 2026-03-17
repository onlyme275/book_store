from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, login_view  # now both exist

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view),
]
