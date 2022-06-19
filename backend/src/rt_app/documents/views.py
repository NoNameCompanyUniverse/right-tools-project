from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics

from rt_app.models import Document

from .serializers import *


class DocumentDeleteView(generics.DestroyAPIView):
    serializer_class = DocumentSerializer

    def get_queryset(self):
        return Document.objects.all()

    @swagger_auto_schema(
        tags=['Документы проекта'], operation_summary="Удалить документ",
        responses={204: ''}
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
