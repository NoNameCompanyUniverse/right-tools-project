from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator
from django.db import models
from django.http import Http404

from image_compressor import comressor, storages

from .common.services import *
from .users.services import *
from .projects.picture.services import *
from .projects.documents.services import *


class User(AbstractUser):
    photo = models.ImageField(
        upload_to=get_path_to_photo,
        null=True,
        storage=storages.OverwriteStorage,
        validators=[FileExtensionValidator(allowed_extensions=['jpg']), validate_size_image]
    )
    description = models.TextField(null=True)
    date_birth = models.DateField(null=True)
    phone = models.CharField(unique=True, max_length=30, null=True)
    subdivision = models.ForeignKey('Subdivision', on_delete=models.PROTECT, null=False)
    banner = models.ImageField(
        upload_to=get_path_to_banner,
        null=True,
        storage=storages.OverwriteStorage,
        validators=[FileExtensionValidator(allowed_extensions=['jpg']), validate_size_image]
    )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.photo:
            comressor.compress_img(self.photo.path)
        if self.banner:
            comressor.compress_img(self.banner.path)


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
    picture = models.ImageField(
        upload_to=get_path_to_picture,
        null=True,
        storage=storages.OverwriteStorage,
        validators=[FileExtensionValidator(allowed_extensions=['jpg']), validate_size_image]
    )
    name = models.CharField(max_length=150, null=False)
    description = models.TextField(null=True)
    admin = models.ForeignKey(User, on_delete=models.PROTECT, null=False, related_name='admin')
    participant = models.ManyToManyField(User)
    date_create = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.picture:
            comressor.compress_img(self.picture.path)


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
    file = models.FileField(
        upload_to=get_path_to_document,
        null=True,
        storage=storages.OverwriteStorage,
        validators=[
            FileExtensionValidator(
                allowed_extensions=['jpg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']
            )
        ]
    )
    project = models.ForeignKey(Project, on_delete=models.PROTECT, null=False)

    def delete(self, using=None, keep_parents=False):
        self.file.delete()
        super().delete(using, keep_parents)
