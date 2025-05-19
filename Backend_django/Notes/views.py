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
def get_notes(request, studyplanid):
    if request.method == 'GET':
        try:
            notes = Note.objects.filter(studyid_id=studyplanid).order_by('-created_at')
            print("Notes fetched:", notes)  # Debugging line
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

def get_notes_by_id(request, note_id):
    print("Fetching note with ID:", note_id)  # Debugging line
    try:
        note = Note.objects.select_related('studyid').get(id=note_id)
        print("Note fetched:", note)  # Debugging line
        print("StudyTracker subject:", note.studyid.subject if note.studyid else "No subject")  # Debugging line
        note_data = {
            'id': note.id,
            'title': note.title,
            'content': note.content,
            'created_at': note.created_at.isoformat() if note.created_at else None,
            'subject': note.studyid.subject if note.studyid else "No subject"
        }
        return JsonResponse(note_data)
    except Note.DoesNotExist:
        return JsonResponse({'error': 'Note not found'}, status=404)