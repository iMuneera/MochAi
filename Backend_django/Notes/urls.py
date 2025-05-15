from django.urls import path
from . import views
 

urlpatterns = [
    path('Fileupload/', views.Fileupload, name='Fileupload'),

]