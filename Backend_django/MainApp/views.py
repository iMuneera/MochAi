

from django.http import JsonResponse
import json


def send_data(request):
    data = {
        'message': 'Hello from Django!',
        'status': 'success'
    }
    return JsonResponse(data)







