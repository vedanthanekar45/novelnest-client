from django.urls import path
from . import views

urlpatterns = [
    # Authentication URLs
     path('home/', views.HomeView.as_view(), name="home"),
     path('register/', views.register, name="register"),
     path('login/', views.Login_view, name="login"),
     path('logout/', views.LogoutView.as_view(), name="logout"),
]