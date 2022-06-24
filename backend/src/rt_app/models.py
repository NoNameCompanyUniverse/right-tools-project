from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator
from django.db import models
from django.http import Http404

from image_compressor import comressor, storages, utils

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
        if self.photo and utils.compare_with_and_height_image(100, 100, self.photo):
            comressor.compress_img(
                self.photo.path,
                new_size_ratio=1.0,
                width=self.photo.width,
                height=self.photo.height
            )
        if self.banner and utils.compare_with_and_height_image(450, 200, self.banner):
            comressor.compress_img(
                self.banner.path,
                new_size_ratio=1.0,
                width=self.banner.width,
                height=self.banner.height
            )
        super(User, self).save(*args, **kwargs)


class Subdivision(models.Model):
    parent = models.ForeignKey('self', on_delete=models.PROTECT, null=True, related_name='children')
    name = models.CharField(max_length=100, null=False)
    description = models.TextField(null=True)
    level = models.IntegerField()

    def __str__(self):
        return f"{self.pk} {self.name}"


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
        if self.picture and utils.compare_with_and_height_image(450, 200, self.picture):
            comressor.compress_img(
                self.picture.path,
                new_size_ratio=1.0,
                width=self.picture.width,
                height=self.picture.height
            )
        super(Project, self).save(*args, **kwargs)


class MindMap(models.Model):
    name = models.CharField(max_length=150, null=False)
    description = models.TextField(null=True)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, null=False)


class KanbanBoard(models.Model):
    name = models.CharField(max_length=150, null=False)
    description = models.TextField(null=True)
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


class MindCard(models.Model):
    TYPE_CARD = (
        ('S', 'source'),
        ('D', 'default'),
        ('T', 'target'),
    )
    mind_map = models.ForeignKey(MindMap, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=100, null=False)
    description = models.TextField(null=True)
    type_card = models.CharField(max_length=1, choices=TYPE_CARD)
    x_coord = models.IntegerField(null=False)
    y_coord = models.IntegerField(null=False)


class KanbanColumn(models.Model):
    kanban_board = models.ForeignKey(KanbanBoard, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=100, null=False)


class KanbanCard(models.Model):
    PRIORITY = (
        ('L', 'low'),
        ('A', 'average'),
        ('H', 'high'),
    )
    kanban_column = models.ForeignKey(KanbanColumn, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=100, null=False)
    priority = models.CharField(max_length=1, choices=PRIORITY)
    description = models.TextField(null=True)


class MindEdges(models.Model):
    mind_map = models.ForeignKey(MindMap, on_delete=models.CASCADE, null=False)
    source = models.ForeignKey(MindCard, on_delete=models.PROTECT, null=False)
    target = models.IntegerField(null=False)
