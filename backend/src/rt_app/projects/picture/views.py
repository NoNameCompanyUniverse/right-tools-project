from django.shortcuts import Http404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import views, parsers, status
from rest_framework.response import Response

from rt_app.models import Project

from ..permissions import *

from .serializers import *


class PictureView(views.APIView):
    permission_classes = [IsOwner, ]

    parser_classes = (parsers.MultiPartParser, parsers.FormParser, parsers.FileUploadParser)

    def get_object(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            raise Http404

    @swagger_auto_schema(tags=['Проекты'], operation_summary="Изменить картинку", request_body=PictureSerializer)
    def patch(self, request, pk):
        project = self.get_object(pk)
        self.check_object_permissions(request, project)
        serializer: PictureSerializer = PictureSerializer(data=request.data, instance=project)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"code": status.HTTP_200_OK}, status=status.HTTP_200_OK)
