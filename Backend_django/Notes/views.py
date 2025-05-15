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
            print("Uploaded files:", uploaded_files)
            
            saved_files = []
            for uploaded_file in uploaded_files:
                try:
                    note = Note(
                        title=uploaded_file.name,  
                        content='', 
                        fileupload=uploaded_file
                    )
                    note.full_clean()  # Validate the model before saving
                    note.save()
                    saved_files.append(uploaded_file.name)
                except Exception as e:
                    print(f"Failed to save {uploaded_file.name}: {str(e)}")
                    continue
            
            if not saved_files:
                return JsonResponse({'status': 'error', 'message': 'Could not save any files'}, status=500)
                
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
            }, status=500)
    
    return JsonResponse({
        'status': 'error', 
        'message': 'Only POST method allowed'
    }, status=405)