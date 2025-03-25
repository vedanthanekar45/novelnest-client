from rest_framework.response import Response
from django.http import JsonResponse
from dotenv import load_dotenv
from os import getenv
import requests

API_URL = "https://www.googleapis.com/books/v1/volumes"

def search (request):
    load_dotenv()
    query = request.GET.get('query')
    if not query:
        return JsonResponse({"error": "Query parameter is required"}, status=400)
    
    api_key = getenv("BOOKS_API_KEY")
    url = "{API_URL}?q={query}&key={api_key}"

    response = requests.get(url)
    print(response)

    if response.status_code == 200:
        data = response.json()
        return JsonResponse(data)
    else:
        return JsonResponse({"error": "Failed to get data from Google Books"}, status=500)

def get_book_details (request, book_id):
    response = requests.get(f"{API_URL}{book_id}")
    if response.status_code == 200:
        return response
    else :
        JsonResponse({"error": "Book not found"}, status=404)


