from django.db import models

# Create your models here.
class User(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=20)
    password = models.CharField(max_length=20)
    is_verified = models.BooleanField(default=False)