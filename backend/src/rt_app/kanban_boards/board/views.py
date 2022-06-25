from django.db.models import QuerySet
from django.http import Http404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import views, status, serializers
from rest_framework.response import Response

from rt_app.models import KanbanBoard, KanbanColumn, KanbanCard

from ..views import BaseKanbanBoardView

from .serializers import *
# from .services import *


class KanbanBoardView(BaseKanbanBoardView, views.APIView):
    @swagger_auto_schema(
        tags=['Kanban-board'], operation_summary='Открыть доску',
        responses={200: KanbanColumnSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        kanban_columns: QuerySet[KanbanColumn] = self.get_object().kanbancolumn_set.all()
        serializer = KanbanColumnSerializer(kanban_columns, many=True)
        return Response(serializer.data)
