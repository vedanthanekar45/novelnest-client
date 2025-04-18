from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search, name="search"),
    path('log_book/', views.log_book, name="log_book")
]