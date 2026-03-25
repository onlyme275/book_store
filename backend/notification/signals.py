from django.db.models.signals import post_save
from django.dispatch import receiver
from books.models import Book
from users.models import User
from notification.models import Notification

@receiver(post_save, sender=Book)
def create_book_notification(sender, instance, created, **kwargs):
    if created:
        students = User.objects.filter(role='Student')
        for student in students:
            Notification.objects.create(
                user=student,
                message=f"New book added: {instance.title} by {instance.author}"
            )
