from django.db import models
import requests

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
class Book(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    cover_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
