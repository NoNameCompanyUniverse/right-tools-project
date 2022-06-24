from django.db.models import Q
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


# class ChangePositionView(BaseKanbanBoardView, views.APIView):
#     def get_card(self, pk):
#         try:
#             return self.get_object().mindcard_set.get(pk=pk)
#         except MindCard.DoesNotExist:
#             raise Http404
#
#     @swagger_auto_schema(
#         tags=['Kanban-board'], operation_summary='Изменить позицию карточки',
#         request_body=ChangePositionSerializer,
#         responses={200: ''}
#     )
#     def patch(self, request, *args, **kwargs):
#         serializer = ChangePositionSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         card = self.get_card(serializer.validated_data.get('card'))
#         KanbanBoardService.change_position(
#             card,
#             serializer.validated_data.get('x', 0),
#             serializer.validated_data.get('y', 0)
#         )
#         return Response(status=status.HTTP_200_OK)
#
#
# class ConnectionView(BaseKanbanBoardView, views.APIView):
#
#     @swagger_auto_schema(
#         tags=['Kanban-board'], operation_summary='Соеденить карточки',
#         request_body=EdgesSerializer(many=True),
#         responses={200: ''}
#     )
#     def post(self, request, *args, **kwargs):
#         serializer = EdgesSerializer(data=request.data, many=True)
#         serializer.is_valid(raise_exception=True)
#         service = KanbanBoardService()
#         service.connect_cards(self.get_object(), serializer.validated_data)
#         return Response(status=status.HTTP_200_OK)
