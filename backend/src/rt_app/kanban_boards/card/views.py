from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets

from ..views import BaseKanbanBoardView

from .serializers import *


@method_decorator(name="create", decorator=swagger_auto_schema(
    tags=['Kanban-card'], operation_summary="Создать карточку kanban",
))
class KanbanCardCreateView(BaseKanbanBoardView, viewsets.ModelViewSet):
    serializer_class = KanbanCardCreateSerializer
