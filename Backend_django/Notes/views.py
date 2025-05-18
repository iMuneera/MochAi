from django.shortcuts import render
from .models import Note, StudyTracker
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def create_note(request):
    if request.method == 'POST':
        studyid = request.POST.get('studyid')
        title = request.POST.get('title')
        content = request.POST.get('content')
        try:
            study_tracker = StudyTracker.objects.get(id=studyid)
        except StudyTracker.DoesNotExist:
            return JsonResponse({'error': 'StudyTracker not found'}, status=404)

        # Create the Note instance
        note = Note(
            studyid=study_tracker,
            title=title,
            content=content,
 
        )
        note.save()

        return JsonResponse({'message': 'Note created successfully', 'note_id': note.id}, status=201)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    

@csrf_exempt
def get_note(request, studyplanid):
    if request.method == 'GET':
        try:
            notes = Note.objects.filter(studyid_id=studyplanid).order_by('-created_at')
            
            if not notes.exists():
                return JsonResponse([], safe=False)  # Return empty array if no notes
            
            notes_data = []
            for note in notes:
                notes_data.append({
                    'id': note.id,
                    'title': note.title or "Untitled Note",  # Fallback title
                    'content': note.content or "",  # Fallback content
                    'created_at': note.created_at.isoformat() if note.created_at else None,
                    'subject': note.studyid.subject if note.studyid else "No subject"
                })
            
            return JsonResponse(notes_data, safe=False)
            
        except Exception as e:
            return JsonResponse(
                {'error': str(e)},
                status=500
            )
    return JsonResponse(
        {'error': 'Invalid request method'},
        status=400
    )