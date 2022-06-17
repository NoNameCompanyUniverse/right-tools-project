from django.http import Http404
from django.utils.decorators import method_decorator
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_200_OK
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from rt_app.models import Project

from .serializers import *
from .permissions import *


@method_decorator(name="list", decorator=swagger_auto_schema(
    tags=['Проекты'], operation_summary="Вывести список проектов",
))
@method_decorator(name="create", decorator=swagger_auto_schema(
    tags=['Проекты'], operation_summary="Создать проект"
))
@method_decorator(name="retrieve", decorator=swagger_auto_schema(
    tags=['Проекты'], operation_summary="Вывести информацию о проекте"
))
@method_decorator(name="update", decorator=swagger_auto_schema(
    tags=['Проекты'], operation_summary="Обновить информацию о проекте"
))
@method_decorator(name="destroy", decorator=swagger_auto_schema(
    tags=['Проекты'], operation_summary="Удалить проект"
))
class ProjectView(ModelViewSet):
    serializer_class = ProjectListSerializer
    queryset = Project.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectListSerializer
        elif self.action == 'retrieve':
            return ProjectDetailSerializer
        elif self.action in ['create', 'update']:
            return ProjectCreateUpdateSerializer

    def destroy(self, request, *args, **kwargs):
        instance: Project = self.get_object()
        instance.document_set.all().delete()
        instance.kanbanboard_set.all().delete()
        instance.mindmap_set.all().delete()
        instance.participant.clear()
        instance.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class PictureView(APIView):
    permission_classes = [IsOwner, ]

    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            raise Http404

    @swagger_auto_schema(tags=['Проекты'], operation_summary="Изменить картинку")
    def patch(self, request, pk):
        project = self.get_object(pk)
        self.check_object_permissions(request, project)
        serializer: PictureSerializer = PictureSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"code": HTTP_200_OK}, status=HTTP_200_OK)
