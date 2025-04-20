from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from dotenv import load_dotenv
from os import getenv
import requests
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()


#  ------- SEARCH APIS --------------
def search (request):
    load_dotenv()
    query = request.GET.get('query')

    if not query:
        return JsonResponse({
            "error": "Query parameter is required"
        }, status=400)
    
    api_key = getenv("BOOKS_API_KEY")
    url = f"https://www.googleapis.com/books/v1/volumes?q={query}&key={api_key}"

    response = requests.get(url)
    print(response)

    if response.status_code == 200:
        data = response.json()
        return JsonResponse(data)
    else:
        return JsonResponse({
            "error": "Failed to get data from Google Books"
        }, status=500)




# --------- BOOK DATA RELATED APIS ------------

# View to create a log
@api_view(['POST'])
# IsAuthenticated() ensures the data goes in only when the user is logged in
@permission_classes([IsAuthenticated])
def log_book (request):
    data = request.data

    # I've used get_or_create in order to not create a duplicate entry of the log
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
        return JsonResponse({
            'message': 'Already logged this book'
        }, status=400)

    return JsonResponse({
        'message': 'Book logged successfully!'
    })


# Get the books that the user has logged to their profile
@api_view(['GET'])
def get_user_books (request, username):
    user = User.objects.get(username=username)
    logs = bookLogData.objects.filter(user=user).order_by('logged_time')

    if not logs:
        return JsonResponse({
            'message': 'No books logged currently'
        }, status=400)

    return JsonResponse(logs, status=200)

@api_view(['GET'])
# Count how many times the book has been logged for each category
def count_book_logs (request):
    # Getting the book id
    book_id = request.GET.get('id')

    # Counting how many times and how the users have interacted with the book
    to_be_read_count = bookLogData.objects.filter(book_id=book_id, status='to_be_read').count()
    currently_reading_count = bookLogData.objects.filter(book_id=book_id, status='currently_reading').count()
    completed_count = bookLogData.objects.filter(book_id=book_id, status='completed').count()
    
    return JsonResponse ({
        'to_be_read': to_be_read_count,
        'currently_reading': currently_reading_count,
        'completed': completed_count,
    }, status=200)


@api_view(['GET'])
def get_book_details (request):
    load_dotenv()

    id = request.GET.get('id')
    api_key = getenv("BOOKS_API_KEY")
    url = f"https://www.googleapis.com/books/v1/volumes/{id}?key={api_key}"

    response = requests.get(url)
    print(response)

    if response.status_code == 200:
        data = response.json()
        return JsonResponse(data)
    else:
        return JsonResponse({
            "error": "Failed to get data from Google Books"
        }, status=500)
    


# --------- USER SHELVES RELATED APIS -----------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_shelf (request):
    data = request.data
    shelf_title = data['title']
    shelf_description = data['description']

    shelf = userShelf.objects.get_or_create(user=request.user, shelfTitle=shelf_title, description=shelf_description)

    return JsonResponse({
        'message': "Shelf created successfully."
    }, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_book_to_shelf (request):
    load_dotenv()
    id = request.GET.get('id')
    api_key = getenv("BOOKS_API_KEY")
    url = f"https://www.googleapis.com/books/v1/volumes/{id}?key={api_key}"
    response = requests.get(url)
    data = response.json()

    book_id = data['id']
    title = data['volumeInfo']['title']
    thumbnail = data['volumeInfo'].get('imageLinks', {}).get('thumbnail', '')

    s_id = request.GET.get('shelf_id')
    shelf_id = userShelf.objects.get(id=s_id)
    shelfbook = ShelfBook.objects.create(shelf=shelf_id, book_id=book_id, title=title, 
                                         thumbnail_url=thumbnail)
    shelfbook.save()

    return JsonResponse({
        'message': "Book successfully added to shelf."
    }, status=200)