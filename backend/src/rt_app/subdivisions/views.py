from django.utils.decorators import method_decorator
from django.http import Http404

from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.viewsets import ModelViewSet

from rt_app.models import Subdivision
from .serializers import SubdivisionTreeSerializer, SubdivisionSerializer


@method_decorator(name="list", decorator=swagger_auto_schema(
    tags=['Подразделения'], operation_summary="Список подразделений в виде дерева"
))
@method_decorator(name="create", decorator=swagger_auto_schema(
    tags=['Подразделения'], operation_summary="Создать подразделение"
))
@method_decorator(name="retrieve", decorator=swagger_auto_schema(
    tags=['Подразделения'], operation_summary="Вывести информацию о подразделении"
))
@method_decorator(name="update", decorator=swagger_auto_schema(
    tags=['Подразделения'], operation_summary="Обновить информацию о подразделенни"
))
@method_decorator(name="destroy", decorator=swagger_auto_schema(
    tags=['Подразделения'], operation_summary="Удалить подразделение"
))
class SubdivisionView(ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'list':
            return SubdivisionTreeSerializer
        return SubdivisionSerializer

    def get_queryset(self):
        if self.action == 'list':
            return Subdivision.objects.filter(parent=None)
        return Subdivision.objects.all()

    def create(self, request, *args, **kwargs):
        serializer: SubdivisionSerializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            serializer.check_parent()
            serializer.check_name()
            serializer.check_level()
        except Exception as e:
            return Response(
                {
                    "code": "400",
                    "message": str(e)
                },
                status=HTTP_400_BAD_REQUEST
            )

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        try:
            serializer.check_parent(instance=instance)
            serializer.check_name()
            serializer.check_level(instance=instance)
        except Exception as e:
            return Response(
                {
                    "code": "400",
                    "message": str(e)
                },
                status=HTTP_400_BAD_REQUEST
            )

        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
