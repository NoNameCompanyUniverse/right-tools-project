from django.http import Http404
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, views
from rest_framework.response import Response

from rt_app.models import KanbanCard, KanbanColumn

from .serializers import *
from .services import *


class BaseKanbanCardView:
    def get_object(self):
        try:
            return KanbanCard.objects.get(pk=self.kwargs.get('pk'))
        except KanbanCard.DoesNotExist:
            raise Http404


@method_decorator(name="retrieve", decorator=swagger_auto_schema(
    tags=['Kanban-card'], operation_summary="Получить информацию о kanban-card",
))
@method_decorator(name="update", decorator=swagger_auto_schema(
    tags=['Kanban-card'], operation_summary="Обновить информацию о kanban-card",
))
@method_decorator(name="destroy", decorator=swagger_auto_schema(
    tags=['Kanban-card'], operation_summary="Удалить kanban-card",
))
class KanbanCardView(BaseKanbanCardView, viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return KanbanCardSerializer
        else:
            return KanbanCardUpdateSerializer


class ChangeKanbanColumnView(BaseKanbanCardView, views.APIView):

    @swagger_auto_schema(
        tags=['Kanban-board'], operation_summary='Переместить карточку',
        request_body=ChangeColumnSerializer,
        responses={200: ''}
    )
    def patch(self, request, *args, **kwargs):
        card: KanbanCard = self.get_object()
        serializer = ChangeColumnSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        service = KanbanCardService()
        service.change_column(card, serializer.validated_data.get('kanban_column'))
        return Response()
