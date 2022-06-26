from django.http import Http404
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets

from rt_app.models import KanbanBoard

from .serializers import KanbanBoardDetailUpdateSerializer


class BaseKanbanBoardView:
    def get_object(self):
        try:
            return KanbanBoard.objects.get(pk=self.kwargs.get('pk'))
        except KanbanBoard.DoesNotExist:
            raise Http404


@method_decorator(name="retrieve", decorator=swagger_auto_schema(
    tags=['Kanban-board'], operation_summary="Вывести информацию о Kanban-board",
))
@method_decorator(name="update", decorator=swagger_auto_schema(
    tags=['Kanban-board'], operation_summary="Обновить информацию о Kanban-board",
))
@method_decorator(name="destroy", decorator=swagger_auto_schema(
    tags=['Kanban-board'], operation_summary="Удалить Kanban-board"
))
class KanbanBoardDetailUpdateDeleteView(BaseKanbanBoardView, viewsets.ModelViewSet):
    serializer_class = KanbanBoardDetailUpdateSerializer
