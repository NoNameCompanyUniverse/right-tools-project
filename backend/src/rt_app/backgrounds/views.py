from django.utils.decorators import method_decorator

from drf_yasg.utils import swagger_auto_schema

from rest_framework.viewsets import ReadOnlyModelViewSet

from rt_app.models import Background

from .serializers import *


@method_decorator(name="list", decorator=swagger_auto_schema(
    tags=['Бэкграунды'], operation_summary="Список бэкграундов"
))
class BackgroundView(ReadOnlyModelViewSet):
    serializer_class = BackgroundSerializer
    queryset = Background.objects.all()
