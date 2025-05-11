from django.urls import path
from . import views

urlpatterns = [
    path('new_language/', views.new_language, name='new_language'),
    path('get_studyPlan/', views.get_studyPlan, name='get_studyPlan'),
]