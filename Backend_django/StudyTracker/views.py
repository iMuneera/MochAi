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
        proficiency = data.get('proficiency')
        

        startdate = datetime.strptime(startdate_str, "%Y-%m-%dT%H:%M:%S.%fZ").date()
        
  
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
                'start_date': tracker.start_date.isoformat(),
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
    study_plans  = StudyTracker.objects.all().values('id', 'subject', 'goal', 'start_date','proficiency_level')
    study_plans = study_plans.order_by('-id')
    print(study_plans )
    subject_count = study_plans.count()
    return JsonResponse(
        {'studyPlan': list(study_plans)
         , 'subject_count': subject_count},
        status=200
    )
