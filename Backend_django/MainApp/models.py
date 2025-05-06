
import requests
from django.db import models
from django.contrib.auth.models import User
from dotenv import load_dotenv
import os



def get_book_info(title):
    url = f"https://openlibrary.org/search.json?title={title}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()

        if data['docs']:
            book = data['docs'][0]
            author = book.get('author_name', ['Unknown'])[0]
            cover_id = book.get('cover_i')
            description = book.get('description')

            cover_url = f"https://covers.openlibrary.org/b/id/{cover_id}-L.jpg" if cover_id else None
            return author, cover_url, description
        else:
            return None, None

def get_movie_info(movie_name):
    load_dotenv()
    api_key = os.getenv('OMDB_API_KEY')
    base_url = "http://www.omdbapi.com/"
    params = {
        't': movie_name,
        'apikey': api_key
    }

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        if data.get('Response') == 'True':
            return (
                data['Title'],
                data['Poster'],
                data['Plot']
            )
    return None



class Book(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    cover_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    poster = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
