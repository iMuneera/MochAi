from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import StudyTracker
from datetime import datetime

@csrf_exempt
def new_language(request):
    try:
        
        data = json.loads(request.body)
        

        language = data.get('language')
        goal = data.get('goal')
        startdate_str = data.get('startdate')
        print("Start date string:", startdate_str)
        proficiency = data.get('proficiency')
        

        startdate = datetime.strptime(startdate_str, "%Y-%m-%dT%H:%M:%S.%fZ").date()
        print("Parsed start date:", startdate)
        
  
        tracker = StudyTracker.objects.create(
            subject=language,
            goal=goal,
            start_date=startdate,
            proficiency_level=proficiency,
        )
        
        return JsonResponse({
            'status': 'success',
            'book_info': {
                'id': tracker.id,
                'subject': tracker.subject,
                'goal': tracker.goal,
                'start_date': tracker.start_date,
                'proficiency_level': tracker.proficiency_level
            }
        }, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except KeyError as e:
        return JsonResponse({'status': 'error', 'message': f'Missing field: {str(e)}'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
 
    
@csrf_exempt
def get_studyPlan(request):
    if request.method != 'GET':
        return JsonResponse({'status': 'error', 'message': 'Only GET method allowed'}, status=405)
    
    try:
        study_plans = StudyTracker.objects.all().order_by('-start_date')
        
        study_plan_data = []
        for plan in study_plans:
            plan_data = {
                'id': plan.id,
                'subject': plan.subject,
                'goal': plan.goal,
                'start_date': plan.start_date.strftime('%Y-%m-%d'),
                'proficiency_level': plan.proficiency_level,
                'completed': plan.completed,
                'completed_date': plan.completed_date.strftime('%Y-%m-%d') if plan.completed_date else None,
                'time_taken': plan.time_taken if plan.completed else None
            }
            study_plan_data.append(plan_data)
        
        return JsonResponse({
            'status': 'success',
            'studyPlan': study_plan_data
        }, status=200)
        
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=500)


@csrf_exempt
def delete_studyPlan(request, id):
    try:
        study_plan = StudyTracker.objects.get(id=id)
        study_plan.delete()
        return JsonResponse({'status': 'success', 'message': 'Study plan deleted successfully'}, status=200)
    except StudyTracker.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Study plan not found'}, status=404)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@csrf_exempt
def complete_studyPlan(request, id):
    if request.method != 'PUT':
        return JsonResponse({'status': 'error', 'message': 'Only PUT method allowed'}, status=405)
    try:
        study_plan = StudyTracker.objects.get(id=id)
        if study_plan.completed:
            return JsonResponse({
                'status': 'message',
                'message': 'Study plan already completed'
            }, status=202)
            
        start_date = study_plan.start_date
        completed_date = datetime.now().date()

        time_taken = (completed_date - start_date).days

        study_plan.completed = True
        study_plan.completed_date = completed_date
        study_plan.time_taken = time_taken
        study_plan.save()
  
        return JsonResponse({
            'status': 'success',
            'message': 'Study plan marked as completed',
            'study_plan': {
                'id': study_plan.id,
                'subject': study_plan.subject,
                'goal': study_plan.goal,
                'start_date': start_date.strftime('%Y-%m-%d'),
                'completed_date': completed_date.strftime('%Y-%m-%d'),
                'proficiency_level': study_plan.proficiency_level,
                'time_taken': time_taken,
                'completed': True
            }
        }, status=200)
        
    except StudyTracker.DoesNotExist:
        return JsonResponse({
            'status': 'error', 
            'message': 'Study plan not found'
        }, status=404)
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=500)