from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.middleware.csrf import get_token


def send_data(request):
    data = {
        'message': 'Hello from Django!',
        'status': 'success'
    }
    return JsonResponse(data)



@csrf_exempt  # This exempts this view from CSRF protection (for testing purposes)
def submit_name(request):
    if request.method == 'POST':
        # Get the data sent from the frontend
        data = json.loads(request.body)
        name = data.get('name')
        print(f"Received name: {name}")

        # Process the data (you can save it, do something with it, etc.)
        return JsonResponse({"message": f"Hello, {name}!"}, status=200)
    return JsonResponse({"error": "Invalid request method"}, status=400)
