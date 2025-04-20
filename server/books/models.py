from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()   # Using Django's in built user model



# Model where the all the book logging data is stored 
class bookLogData (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book_id = models.CharField(max_length=20)   # book_id comes from the Google Books API
    title = models.CharField(max_length=255)
    thumbnail_url = models.URLField(null=True, blank=True)
    status = models.CharField(choices = [
        ("to_be_read", "To Be Read"),
        ("currently_reading", "Currently Reading"),
        ("completed", "Completed")
    ])    #  Three choices for the user to do with that book entry
    rating = models.FloatField(null=True, blank=True, choices = [
        (0.5, '½'),
        (1.0, '★'),
        (1.5, '★½'),
        (2.0, '★★'),
        (2.5, '★★½'),
        (3.0, '★★★'),
        (3.5, '★★★½'),
        (4.0, '★★★★'),
        (4.5, '★★★★½'),
        (5.0, '★★★★★'),
    ])    #  Letterboxd style rating system
    notes = models.TextField(null=True, blank=True)
    logged_time = models.DateTimeField(auto_now_add=True)



# Model for User created Shelves. A user created list is called a shelf here.
class userShelves (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shelves')
    shelfTitle = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    booklog = models.ManyToManyField('bookLogData', related_name='shelves')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__ (self):
        return f"{self.name} (by {self.user.username})"