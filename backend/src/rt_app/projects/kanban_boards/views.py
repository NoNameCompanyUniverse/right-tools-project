from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets

from .serializers import *
from ..views import BaseProjectDetailView


@method_decorator(name="list", decorator=swagger_auto_schema(
    tags=['Kanban-board'], operation_summary="Вывести список Kanban-board проекта",
    responses={200: KanbanBoardListCreateSerializer(many=True)}
))
@method_decorator(name="create", decorator=swagger_auto_schema(
    tags=['Kanban-board'], operation_summary="Добавить Kanban-board в проект",
    responses={200: KanbanBoardListCreateSerializer()}
))
class KanbanBoardView(BaseProjectDetailView, viewsets.ModelViewSet):
    def get_queryset(self):
        return self.get_object().kanbanboard_set.select_related('project').all()

    def get_serializer_class(self):
        return KanbanBoardListCreateSerializer
