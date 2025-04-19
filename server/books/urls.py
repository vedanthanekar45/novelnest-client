from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search, name="search"),
    path('log_book/', views.log_book, name="log_book"),
    path('get_user_books/', views.get_user_books, name="get_user_books"),
    path('count_book_logs/', views.count_book_logs, name="count_book_logs"),
    path('get_book_data/', views.get_book_details, name="get_book_details"),
]