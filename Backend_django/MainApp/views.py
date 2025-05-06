from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.middleware.csrf import get_token
from .models import get_book_info, get_movie_info
from .models import Book, Movie

def send_data(request):
    data = {
        'message': 'Hello from Django!',
        'status': 'success'
    }
    return JsonResponse(data)



@csrf_exempt
def submit_name(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data.get('name')
        author, cover_url,description = get_book_info(title)
        
        response_data = {
            'message': 'Book information retrieved successfully',
            'book_info': {
                'title': title,
                'author': author,
                'cover_url': cover_url,
                'description': description 
            }
        }
        
        return JsonResponse(response_data, status=200)
    return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def add_to_library(request):
    print("Add to library view called!")
    
    try:
        # Load JSON data from request body
        data = json.loads(request.body)
        print("Received data:", data)
        
        # Check for existing book
        existing_book = Book.objects.filter(
            title=data.get('title')
        ).first()
        
        if existing_book:
            print("Book already exists")
            return JsonResponse(
                {'message': 'This book is already in your library'},
                status=202
            )
        
        print("Creating new book...")
        book = Book.objects.create(
            title=data.get('title'),
            author=data.get('author', 'Unknown'),
            description=data.get('description', ''),
            cover_url=data.get('cover_url', '')
        )
        
        print("Book created with ID:", book.id)
        
        # Manually create response data
        book_data = {
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'description': book.description,
            'cover_url': book.cover_url,
            'created_at': book.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        
        return JsonResponse({
            'message': 'Book added to your library successfully!',
            'book': book_data
        }, status=201)
        
    except json.JSONDecodeError:
        print("Invalid JSON received")
        return JsonResponse(
            {'error': 'Invalid JSON data'},
            status=400
        )
    except Exception as e:
        print("Error:", str(e))
        return JsonResponse(
            {'error': str(e)},
            status=400
        )
  
def viewlibrary(request):
    books = Book.objects.all().values('id', 'title', 'author', 'description', 'cover_url')
    print("Books in library:", books)
    return JsonResponse(
        {'books': list(books)},
        status=200
    )
@csrf_exempt
def viewmovie(request):
    movies = Movie.objects.all().values('id', 'title', 'description', 'poster')
    return JsonResponse(
        {'movies': list(movies)},
        status=200
    )

@csrf_exempt
def submit_Movie(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            movie_name = data.get('Movie')
            movie_info = get_movie_info(movie_name)
            if movie_info:
                Title, PosterURL, Plot = movie_info
                response_data = {
                    'message': 'Movie information retrieved successfully',
                    'movie_info': {
                        'title': Title,
                        'poster': PosterURL,
                        'plot': Plot,
                    }
                }
                return JsonResponse(response_data, status=200)
            return JsonResponse({"error": "Movie information could not be retrieved"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=400)

@csrf_exempt
def add_movie(request):
    try:
        data = json.loads(request.body)
        
        existing_movie = Movie.objects.filter(
            title=data.get('title')
        ).first()
        
        if existing_movie:
            return JsonResponse(
                {'message': 'This movie is already in your library'},
                status=202
            )
        
        movie = Movie.objects.create(
            title=data.get('title'),
            description=data.get('description', ''),
            poster=data.get('poster', '')
        )
        
        movie_data = {
            'id': movie.id,
            'title': movie.title,
            'description': movie.description,
            'poster': movie.poster,
            'created_at': movie.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        
        return JsonResponse({
            'message': 'Movie added to your library successfully!',
            'movie': movie_data
        }, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse(
            {'error': 'Invalid JSON data'},
            status=400
        )
    except Exception as e:
        return JsonResponse(
            {'error': str(e)},
            status=400
        )