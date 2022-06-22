from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets

from .serializers import *
from ..views import BaseProjectDetailView


@method_decorator(name="list", decorator=swagger_auto_schema(
    tags=['Mind-map'], operation_summary="Вывести список mind-карты проекта",
    responses={200: MindMapListCreateSerializer(many=True)}
))
@method_decorator(name="create", decorator=swagger_auto_schema(
    tags=['Mind-map'], operation_summary="Добавить mind-карту в проект",
    responses={200: MindMapListCreateSerializer()}
))
class MindMapView(BaseProjectDetailView, viewsets.ModelViewSet):
    def get_queryset(self):
        return self.get_object().mindmap_set.select_related('project').all()

    def get_serializer_class(self):
        return MindMapListCreateSerializer
