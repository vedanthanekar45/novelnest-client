from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    # Authentication URLs
     path('home/', views.HomeView.as_view(), name="home"),
     path('register/', views.register, name="register"),
     path('logout/', views.LogoutView.as_view(), name="logout"),
]