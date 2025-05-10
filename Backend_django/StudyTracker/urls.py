from django.urls import path
from . import views

urlpatterns = [
    path('new_language/', views.new_language, name='new_language'),
]