from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *

# Create your views here.

class HomeView (APIView):

    permission_classes = (IsAuthenticated, )
    def get (self, request):
        content = {
            'message': 'Welcome to the JWT Authentication page using React and Django',
        }
        return Response(content)
    
# Defining serializers
# Serializers help convert anything like a queryset into python data variables
class Userserializer (serializers.Serializer):
    full_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    username = serializers.CharField(max_length=20)
    password = serializers.CharField()
    is_verified = serializers.BooleanField(default=False)

# Authentication Views
@api_view(['POST'])
def register (request):
    if request.method == 'POST':
        serializer = Userserializer(data=request.data)

        if serializer.is_valid():
            s_full_name = serializer.validated_data['full_name']
            s_email = serializer.validated_data['email']
            s_username = serializer.validated_data['username']
            s_password = serializer.validated_data['password']

            if User.objects.filter(username=s_username).exists():
                return Response({
                        "error": "User already exists!"
                    }, status=status.HTTP_400_BAD_REQUEST)
            
            hashed_password = make_password(s_password)
            database_user = User.objects.create(full_name=s_full_name, email=s_email, username=s_username, password=hashed_password, is_verified=False)
            database_user.save()

            # Generate Tokens
            refresh = RefreshToken()
            access = str(refresh.access_token)

            return Response({
                "message": "User created successfully!",
                "access": access,
                "refresh": str(refresh)
            }, status=status.HTTP_201_CREATED)

        return Response({"error": "error doing this shit"}, status=status.HTTP_400_BAD_REQUEST)
            


class LogoutView (APIView):
    permission_classes = (IsAuthenticated, )
    def post (self, request):
        try:
            refresh_token = request.data["refresh"]
            print(refresh_token)
            token = RefreshToken(refresh_token)
            print("Everything's happening great until now!")
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    

