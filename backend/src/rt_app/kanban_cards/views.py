from django.http import Http404
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets

from rt_app.mind_maps.views import BaseMindMapView

from .serializers import *


@method_decorator(name="retrieve", decorator=swagger_auto_schema(
    tags=['Kanban-card'], operation_summary="Получить информацию о kanban-card",
))
@method_decorator(name="update", decorator=swagger_auto_schema(
    tags=['Kanban-card'], operation_summary="Обновить информацию о kanban-card",
))
@method_decorator(name="destroy", decorator=swagger_auto_schema(
    tags=['Kanban-card'], operation_summary="Удалить kanban-card",
))
class KanbanCardView(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return KanbanCardSerializer
        else:
            return KanbanCardUpdateSerializer

    def get_object(self):
        try:
            return KanbanCard.objects.get(pk=self.kwargs.get('pk'))
        except KanbanCard.DoesNotExist:
            raise Http404
