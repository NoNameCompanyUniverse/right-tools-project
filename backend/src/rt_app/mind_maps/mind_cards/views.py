from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets

from ..views import BaseMindMapView

from .serializers import *


@method_decorator(name="create", decorator=swagger_auto_schema(
    tags=['Mind-cards'], operation_summary="Создать mind-card",
))
class MindCardCreateView(BaseMindMapView, viewsets.ModelViewSet):
    serializer_class = MindCardCreateSerializer
