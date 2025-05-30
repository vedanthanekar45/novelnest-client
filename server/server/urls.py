from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),

    # Token URLs
    path('token/', 
         jwt_views.TokenObtainPairView.as_view(),
         name="token_obtain_pair"),
    path('token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name="token_refresh"),

     path('', include('userauth.urls')),
     path('', include('books.urls'))

]