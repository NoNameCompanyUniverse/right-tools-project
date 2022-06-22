from django.http import Http404
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets

from rt_app.models import KanbanBoard

from .serializers import KanbanBoardDetailUpdateSerializer


@method_decorator(name="retrieve", decorator=swagger_auto_schema(
    tags=['Kanban-board'], operation_summary="Вывести информацию о mind-map",
))
@method_decorator(name="update", decorator=swagger_auto_schema(
    tags=['Kanban-board'], operation_summary="Обновить информацию о mind-map",
))
@method_decorator(name="destroy", decorator=swagger_auto_schema(
    tags=['Kanban-board'], operation_summary="Удалить mind-map"
))
class KanbanBoardDetailUpdateDeleteView(viewsets.ModelViewSet):
    serializer_class = KanbanBoardDetailUpdateSerializer

    def get_object(self):
        try:
            return KanbanBoard.objects.get(pk=self.kwargs.get('pk'))
        except KanbanBoard.DoesNotExist:
            raise Http404
