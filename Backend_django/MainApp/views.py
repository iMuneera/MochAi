from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.http import JsonResponse




def send_data(request):
    data = {
        'message': 'Hello from Django!',
        'status': 'success'
    }
    return JsonResponse(data)