from django.db import models

# Create your models here.

class StudyTracker(models.Model):
    id = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=100)
    goal= models.CharField(max_length=100)
    start_date = models.DateField()
    proficiency_level = models.CharField(max_length=50)
