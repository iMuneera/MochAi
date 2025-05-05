from django.urls import path
from . import views
 
urlpatterns = [
    path('send_data/', views.send_data, name='send_data'),
    path('submit_name/', views.submit_name, name='submit_name'),
    path('add_to_library/', views.add_to_library),
    path('viewlibrary/', views.viewlibrary, name='view_library'),
    path('submit_Movie/', views.submit_Movie, name='submit_Movie'),
]
