from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search, name="search"),
    path('bookinfo/<str:book_id>/', views.get_book_details, name="bookinfo")
]