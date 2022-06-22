from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets

from rt_app.mind_maps.views import BaseMindMapView

from .serializers import *


@method_decorator(name="retrieve", decorator=swagger_auto_schema(
    tags=['Mind-cards'], operation_summary="Получить информацию о mind-card",
))
@method_decorator(name="update", decorator=swagger_auto_schema(
    tags=['Mind-cards'], operation_summary="Обновить информацию о mind-card",
))
@method_decorator(name="destroy", decorator=swagger_auto_schema(
    tags=['Mind-cards'], operation_summary="Удалить mind-card",
))
class MindCardView(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return MindCardSerializer
        else:
            return MindCardUpdateSerializer

    def get_object(self):
        return MindCard.objects.get(pk=self.kwargs.get('pk'))
