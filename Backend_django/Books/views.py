from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import get_book_info
from .models import Book
# Create your views here.

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
        rating = data.get('rating', None)
        if rating is not None:
            try:
                rating = int(rating)
                if rating < 0 or rating > 5:  # Assuming 0-5 rating scale
                 rating = None
            except (ValueError, TypeError):
                rating = None


        
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
            cover_url=data.get('cover_url', ''),
            rating = data.get('rating', None)  
        )
        
        print("Book created with ID:", book.id)
        
        # Manually create response data
        book_data = {
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'description': book.description,
            'cover_url': book.cover_url,
            'created_at': book.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'rating': book.rating
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
                'description': description,
                'rating':2
            }
        }
        
        return JsonResponse(response_data, status=200)
    return JsonResponse({"error": "Invalid request method"}, status=400)


  
def viewlibrary(request):
    books = Book.objects.all().values('id', 'title', 'author', 'description', 'cover_url','rating', 'review')
    print("Books in library:", books)
    return JsonResponse(
        {'books': list(books)},
        status=200
    )

@csrf_exempt
def delete_book(request, book_id):
    if request.method == 'DELETE':
        try:
            book = Book.objects.get(id=book_id)
            book.delete()
            return JsonResponse({'success': True})
        except Book.DoesNotExist:
            return JsonResponse({'error': 'Book not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def review_book(request, book_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            review = data.get('review')
            rating = data.get('rating')
            
            book = Book.objects.get(id=book_id)
            book.review = review
            book.rating = rating
            book.save()
            return JsonResponse({
        'success': True,
        'review': {
        'id': book.id,
        'content': book.review,
        'rating': book.rating
          }
}, status=200)
        except Book.DoesNotExist:
            return JsonResponse({'error': 'Book not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=400)