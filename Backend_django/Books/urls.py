
from django.urls import path
from . import views
urlpatterns = [
    path('submit_name/', views.submit_name, name='submit_name'),
    path('add_to_library/', views.add_to_library),
    path('viewlibrary/', views.viewlibrary, name='view_library'),
    path('viewlibrary/<int:book_id>/', views.delete_book, name='delete-book'),
    path('review_book/<int:book_id>/', views.review_book, name='review-book'),
]