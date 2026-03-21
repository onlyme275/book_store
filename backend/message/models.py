from django.db import models
from django.conf import settings  # <-- important

class Message(models.Model):
    content = models.TextField()
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # use custom user
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # receiver is also a user
        on_delete=models.CASCADE,
        related_name='received_messages'
    )
    sender_role = models.CharField(max_length=10, choices=[('student','Student'),('admin','Admin')])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} -> {self.receiver}: {self.content[:20]}"