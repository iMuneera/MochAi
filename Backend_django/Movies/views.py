from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Movie, get_movie_info

@csrf_exempt
def viewmovie(request):
    movies = Movie.objects.all().values('id', 'title', 'description', 'poster')
    return JsonResponse(
        {'movies': list(movies)},
        status=200
    )
@csrf_exempt
def delete_movie(request, movie_id):
    if request.method == 'DELETE':
        try:
            movie = Movie.objects.get(id=movie_id)
            movie.delete()
            return JsonResponse({'success': True})
        except Movie.DoesNotExist:
            return JsonResponse({'error': 'Movie not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=400)




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