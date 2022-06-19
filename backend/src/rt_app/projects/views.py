from django.http import Http404
from django.utils.decorators import method_decorator

from rest_framework import viewsets, views, parsers, status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from rt_app.models import Project

from .serializers import *
from .permissions import *


class BaseProjectDetailView(views.APIView):
    def get_object(self) -> Project:
        try:
            return Project.objects.get(pk=self.kwargs.get('pk'))
        except Project.DoesNotExist:
            raise Http404


@method_decorator(name="list", decorator=swagger_auto_schema(
    tags=['Проекты'], operation_summary="Вывести список проектов",
))
@method_decorator(name="create", decorator=swagger_auto_schema(
    tags=['Проекты'], operation_summary="Создать проект",
    request_body=RequestCreateProjectSerializer,
    responses={201: ResponseCreateProjectSerializer()},
))
@method_decorator(name="retrieve", decorator=swagger_auto_schema(
    tags=['Проекты'], operation_summary="Вывести информацию о проекте"
))
@method_decorator(name="update", decorator=swagger_auto_schema(
    tags=['Проекты'], operation_summary="Обновить информацию о проекте",
    request_body=RequestUpdateProjectSerializer,
    responses={201: ResponseUpdateProjectSerializer()},
))
@method_decorator(name="destroy", decorator=swagger_auto_schema(
    tags=['Проекты'], operation_summary="Удалить проект"
))
class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectListSerializer
    queryset = Project.objects.all().prefetch_related('participant')

    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectListSerializer
        elif self.action == 'retrieve':
            return ProjectDetailSerializer
        elif self.action == 'create':
            return ProjectCreateSerializer
        elif self.action == 'update':
            return ProjectUpdateSerializer

    def destroy(self, request, *args, **kwargs):
        instance: Project = self.get_object()
        instance.document_set.all().delete()
        instance.kanbanboard_set.all().delete()
        instance.mindmap_set.all().delete()
        instance.participant.clear()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
