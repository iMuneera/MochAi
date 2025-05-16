from django.shortcuts import render
from .models import Note, StudyTracker
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def Fileupload(request):
    if request.method == 'POST':
        try:
            if not request.FILES:
                return JsonResponse({'status': 'error', 'message': 'No files uploaded'}, status=400)
            uploaded_files = request.FILES.getlist('files')
            studyid= request.POST.getlist('studyplanid')
            studyid=studyid[0]
            print("Uploaded files:", uploaded_files)
            print("Study ID:", studyid)
            study_tracker = StudyTracker.objects.get(id=studyid[0])
            study_subject = study_tracker.subject
            print("Study subject:", study_subject)
            saved_files = []
            for uploaded_file in uploaded_files:
                    note = Note(
                        title=uploaded_file.name,  
                        content='', 
                        fileupload=uploaded_file,
                        studyid=study_tracker
                    )
                    note.full_clean() 
                    note.save()
                    saved_files.append(uploaded_file.name)
            print("Saved files:", saved_files)
                
            return JsonResponse({
                'status': 'success', 
                'message': f'{len(saved_files)} file(s) uploaded successfully!',
                'files': saved_files
            })
        except Exception as e:
            print(f"Upload error: {str(e)}")
            return JsonResponse({
                'status': 'error', 
                'message': f'File upload failed: {str(e)}'
            })
    


@csrf_exempt
def getpdf(request):
    if request.method == 'GET':
        print("Fetching notes...")
        try:
            notes = Note.objects.all()
            print("Notes fetched:", notes)
            notes_data = []
            for note in notes:
                print("Note ID:", note.id)
                notes_data.append({
                    'id': note.id,
                    'title': note.title,
                    'fileupload': note.fileupload.url if note.fileupload else None,
                })
            print("Notes data:", notes_data)
            return JsonResponse({'status': 'success', 'notes': notes_data})
        except Exception as e:
            print(f"Error fetching notes: {str(e)}")
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only GET method allowed'}, status=405)