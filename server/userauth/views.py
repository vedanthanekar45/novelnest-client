from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

class HomeView (APIView):

    permission_classes = (IsAuthenticated, )
    def get (self, request):
        content = {
            'message': 'Welcome to the JWT Authentication page using React and Django',
        }
        return Response(content)
    

# Authentication Views
@api_view(['POST'])
def register (request):
    if request.method == 'POST':
        s_full_name = request.data.get('full_name')
        s_email = request.data.get('email')
        s_username = request.data.get('username')
        s_password = request.data.get('password')

        if User.objects.filter(username=s_username).exists():
            return Response({
                    "error": "User already exists!"
                }, status=status.HTTP_400_BAD_REQUEST)
            
        if User.objects.filter(email=s_email).exists():
            return Response({
                    "error": "Email is already registered!"
                }, status=status.HTTP_400_BAD_REQUEST)
            
        database_user = User.objects.create_user(
            last_name=s_full_name, 
            email=s_email, 
            username=s_username, 
            password=s_password)
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

# Login View
@api_view(['POST'])
def Login_view (request):
    username = request.data.get("username")
    password = request.data.get("password")
    
    user = authenticate(request, username=username, password=password)
    print(user)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        return Response({
            'message': 'Login successful',
            'access': access,
            'refresh': str(refresh),
        }, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Logout View
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
