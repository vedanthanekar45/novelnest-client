from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from dotenv import load_dotenv
from os import getenv
import requests
from .models import bookLogData

def search (request):
    load_dotenv()
    query = request.GET.get('query')
    if not query:
        return JsonResponse({"error": "Query parameter is required"}, status=400)
    
    api_key = getenv("BOOKS_API_KEY")
    url = f"https://www.googleapis.com/books/v1/volumes?q={query}&key={api_key}"

    response = requests.get(url)
    print(response)

    if response.status_code == 200:
        data = response.json()
        return JsonResponse(data)
    else:
        return JsonResponse({"error": "Failed to get data from Google Books"}, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def log_book (request):
    data = request.data
    created = bookLogData.objects.get_or_create(
        user = request.user,
        book_id = data['google_book_id'],
        defaults = {
            'title' : data['title'],
            'thumbnail_url' : data['thumbnail_url'],
            'status': data['status'],
            'rating': data.get('rating'),
            'notes': data.get('notes')
        }
    )

    if not created:
        return JsonResponse({'message': 'Already logged this book'}, status=400)

    return JsonResponse({'message': 'Book logged successfully!'})