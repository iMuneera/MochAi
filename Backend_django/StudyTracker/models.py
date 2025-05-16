from django.db import models

class StudyTracker(models.Model):
    id = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=100)
    goal = models.CharField(max_length=100)
    start_date = models.DateField()
    proficiency_level = models.CharField(max_length=50)
    completed = models.BooleanField(default=False)
    completed_date = models.DateField(null=True, blank=True)
    time_taken = models.IntegerField(null=True, blank=True)


