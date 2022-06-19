from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, parsers, status, views
from rest_framework.response import Response

from rt_app.models import Project

from .serializers import *

from ..views import BaseProjectDetailView


class DocumentView(BaseProjectDetailView, generics.ListAPIView, generics.CreateAPIView):
    parser_classes = (parsers.MultiPartParser, parsers.FormParser, parsers.FileUploadParser)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return DocumentSerializer
        elif self.request.method == 'POST':
            return DocumentSerializer

    def get_queryset(self):
        return self.get_object().document_set.select_related('project').all()

    @swagger_auto_schema(
        tags=['Документы проекта'], operation_summary="Вывести список документов проекта",
        responses={200: DocumentSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Документы проекта'], operation_summary="Добавить документ проекта",
        request_body=DocumentCreateSerializer,
        responses={200: DocumentSerializer()}
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
