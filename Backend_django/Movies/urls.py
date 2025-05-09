from django.urls import path
from . import views
 

urlpatterns = [
    path('viewmovie/', views.viewmovie, name='view_movie'),
      path('submit_Movie/', views.submit_Movie, name='submit_Movie'),
    path('add_movie/', views.add_movie, name='add_movie'),
   path('viewmovie/<int:movie_id>/', views.delete_movie, name='delete-movie'),
   path('viewmovie/<int:movie_id>/', views.delete_movie, name='delete-movie'),
   path('review_movie/<int:movie_id>/', views.review_movie, name='review-movie'),
]