from django.urls import path
from . import views
 

urlpatterns = [
path('create_note/', views.create_note, name='create_note'),
path('get_note/<int:studyplanid>/', views.get_note, name='get_note'),
]