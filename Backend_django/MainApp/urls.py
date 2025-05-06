from django.urls import path
from . import views
 
urlpatterns = [
    path('send_data/', views.send_data, name='send_data'),
    path('submit_name/', views.submit_name, name='submit_name'),
    path('add_to_library/', views.add_to_library),
    path('viewlibrary/', views.viewlibrary, name='view_library'),
    path('viewmovie/', views.viewmovie, name='view_movie'),
    path('submit_Movie/', views.submit_Movie, name='submit_Movie'),
    path('add_movie/', views.add_movie, name='add_movie'),
]
