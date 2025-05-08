from django.db import models
from dotenv import load_dotenv
import os, requests
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.
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



class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    poster = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(blank=True, null=True , validators=[MinValueValidator(1), MaxValueValidator(5)])  