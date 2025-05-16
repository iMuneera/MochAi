from django.db import models
from StudyTracker.models import StudyTracker

class Note(models.Model):
    studyid = models.ForeignKey(
        StudyTracker,
        on_delete=models.CASCADE,
        related_name='notes' 
    )
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.TextField(null=True, blank=True)
    fileupload = models.FileField(upload_to='uploads/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
