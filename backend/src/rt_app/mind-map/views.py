from django.http import Http404
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets

from rt_app.models import MindMap

from .serializers import MindMapDetailUpdateSerializer


@method_decorator(name="retrieve", decorator=swagger_auto_schema(
    tags=['Mind-map'], operation_summary="Вывести информацию о mind-map",
))
@method_decorator(name="update", decorator=swagger_auto_schema(
    tags=['Mind-map'], operation_summary="Обновить информацию о mind-map",
))
@method_decorator(name="destroy", decorator=swagger_auto_schema(
    tags=['Mind-map'], operation_summary="Удалить mind-map"
))
class MindMapDetailUpdateDeleteView(viewsets.ModelViewSet):
    serializer_class = MindMapDetailUpdateSerializer

    def get_object(self):
        try:
            return MindMap.objects.get(pk=self.kwargs.get('pk'))
        except MindMap.DoesNotExist:
            raise Http404
