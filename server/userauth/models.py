from django.db import models

# Create your models here.
class User(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=20)
    created_on = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)