from django.urls import path
from . import views
 

urlpatterns = [
path('create_note/', views.create_note, name='create_note'),
path('get_notes/<int:studyplanid>/', views.get_notes, name='get_notes'),
path('get_notes_by_id/<int:note_id>/', views.get_notes_by_id, name='get_notes_by_id'),
]