from django.http import Http404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import views
from rest_framework.response import Response

from rt_app.models import MindMap

from ..views import BaseMindMapView

from .serializers import *


class MindMapView(BaseMindMapView, views.APIView):
    @swagger_auto_schema(
        tags=['Mind-map'], operation_summary='Открыть всю карту',
        responses={200: MindMapSerializer()}
    )
    def get(self, request, *args, **kwargs):
        result = {"nodes": '', "edges": ''}

        mind_map: MindMap = self.get_object()
        cards = mind_map.mindcard_set.select_related('mind_map').all()

        nodes = NodesListSerializer(cards, many=True).data
        edges = EdgesListSerializer(cards.exclude(parent=None), many=True).data

        result['nodes'] = nodes
        result['edges'] = edges

        return Response(result)


# class ConnectionView(BaseMindMapView, views.APIView):
#     def post(self):
