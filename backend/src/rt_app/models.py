from django.contrib.auth.models import AbstractUser
from django.db import models
from django.http import Http404

from config.settings import BASE_DIR


class User(AbstractUser):
    photo = models.ImageField(upload_to=BASE_DIR / 'media/images', null=True)
    description = models.TextField(null=True)
    date_birth = models.DateField(null=True)
    phone = models.CharField(unique=True, max_length=30, null=True)
    user_created = models.CharField(max_length=150, null=False)
    subdivision = models.ForeignKey('Subdivision', on_delete=models.PROTECT, null=False)


class Subdivision(models.Model):
    parent = models.ForeignKey('self', on_delete=models.PROTECT, null=True, related_name='children')
    name = models.CharField(max_length=100, null=False)
    description = models.TextField(null=True)
    level = models.IntegerField()

    def __str__(self):
        return f"{self.pk} {self.name}"
