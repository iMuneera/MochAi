from django.urls import path
from . import views

urlpatterns = [
    path('new_language/', views.new_language, name='new_language'),
    path('get_studyPlan/', views.get_studyPlan, name='get_studyPlan'),
    path('delete_studyPlan/<int:id>/', views.delete_studyPlan, name='delete_studyPlan'),
    path('complete_studyPlan/<int:id>/', views.complete_studyPlan, name='complete_studyPlan'),
]