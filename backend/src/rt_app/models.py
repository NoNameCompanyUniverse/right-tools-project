from django.contrib.auth.models import AbstractUser
from django.db import models
from django.http import Http404

from config.settings import BASE_DIR
from .storages import OverwriteStorage


class User(AbstractUser):
    photo = models.ImageField(upload_to=BASE_DIR / 'media/images', null=True, storage=OverwriteStorage)
    description = models.TextField(null=True)
    date_birth = models.DateField(null=True)
    phone = models.CharField(unique=True, max_length=30, null=True)
    subdivision = models.ForeignKey('Subdivision', on_delete=models.PROTECT, null=False)


class Subdivision(models.Model):
    parent = models.ForeignKey('self', on_delete=models.PROTECT, null=True, related_name='children')
    name = models.CharField(max_length=100, null=False)
    description = models.TextField(null=True)
    level = models.IntegerField()

    def __str__(self):
        return f"{self.pk} {self.name}"


class Background(models.Model):
    photographer = models.CharField(max_length=150, null=False)
    source = models.URLField(null=False)
    picture_url = models.URLField(null=False)
    compress_url = models.URLField(null=False)
    category = models.CharField(max_length=150, null=False)


class Project(models.Model):
    picture = models.ImageField(upload_to=BASE_DIR / 'media/images', null=True, storage=OverwriteStorage)
    name = models.CharField(max_length=150, null=False)
    description = models.TextField(null=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=False, related_name='manager')
    participant = models.ManyToManyField(User)
    date_create = models.DateField(auto_now_add=True)


class MindMap(models.Model):
    name = models.CharField(max_length=150, null=False)
    description = models.TextField(null=True)
    compress_background_url = models.URLField(null=False)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, null=False)


class KanbanBoard(models.Model):
    name = models.CharField(max_length=150, null=False)
    description = models.TextField(null=True)
    original_background_url = models.URLField(null=False)
    compress_background_url = models.URLField(null=False)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, null=False)


class Document(models.Model):
    file = models.FileField(upload_to=BASE_DIR / 'media/documents', null=False, storage=OverwriteStorage)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, null=False)
