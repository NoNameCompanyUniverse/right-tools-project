from typing import Callable

from django.db.models import Q, QuerySet
from django.http import Http404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import views, status, serializers
from rest_framework.response import Response

from rt_app.models import MindMap, MindCard, MindEdges

from ..views import BaseMindMapView

from .serializers import *
from .services import *


class MindMapView(BaseMindMapView, views.APIView):
    @swagger_auto_schema(
        tags=['Mind-map'], operation_summary='Открыть всю карту',
        responses={200: MindMapSerializer()}
    )
    def get(self, request, *args, **kwargs):
        result = {"nodes": '', "edges": ''}

        mind_map: MindMap = self.get_object()

        cards: QuerySet[MindCard] = mind_map.mindcard_set.select_related('mind_map').all().order_by('pk')
        nodes = NodesListSerializer(cards, many=True).data

        edges: QuerySet[MindEdges] = mind_map.mindedges_set.select_related('mind_map').all().order_by('pk')
        edges = EdgesListSerializer(edges, many=True).data

        result['nodes'] = nodes
        result['edges'] = edges

        return Response(result)


class ChangePositionView(BaseMindMapView, views.APIView):
    def get_card(self, pk):
        try:
            return self.get_object().mindcard_set.select_related('mind_map').get(pk=pk)
        except MindCard.DoesNotExist:
            raise Http404

    @swagger_auto_schema(
        tags=['Mind-map'], operation_summary='Изменить позицию карточки',
        request_body=ChangePositionSerializer,
        responses={200: ''}
    )
    def patch(self, request, *args, **kwargs):
        serializer = ChangePositionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        card = self.get_card(serializer.validated_data.get('card'))
        MindMapService.change_position(
            card,
            serializer.validated_data.get('x', 0),
            serializer.validated_data.get('y', 0)
        )
        return Response(status=status.HTTP_200_OK)


class ConnectionView(BaseMindMapView, views.APIView):

    @swagger_auto_schema(
        tags=['Mind-map'], operation_summary='Соеденить карточки',
        request_body=EdgesSerializer(many=True),
        responses={200: ''}
    )
    def post(self, request, *args, **kwargs):
        serializer = EdgesSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        service = MindMapService()
        service.connect_cards(self.get_object(), serializer.validated_data)
        return Response(status=status.HTTP_200_OK)
