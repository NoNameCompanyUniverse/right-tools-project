from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework import views, status, generics

from rt_app.models import Project

from rt_app.projects.serializers import ProjectListSerializer

from .serializers import *


class ProfileInfoView(views.APIView):
    def get_object(self):
        return self.request.user

    @swagger_auto_schema(
        tags=['Текущий пользователь'],
        operation_summary="Информация на главной странице",
        responses={
            200: ProfileInfoSerializer(read_only=True),
            400: 'Bad request',
            404: 'Not found',
        }
    )
    def get(self, request):
        user = self.get_object()
        serializer = ProfileInfoSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileProjectsView(generics.ListAPIView):
    serializer_class = ProjectListSerializer

    def get_queryset(self):
        return Project.objects\
            .select_related('admin')\
            .prefetch_related('participant')\
            .filter(Q(admin=self.request.user) | Q(participant__in=[self.request.user]))\
            .distinct()\
            .order_by('pk')

    @swagger_auto_schema(
        tags=['Текущий пользователь'],
        operation_summary="Информация проектах для данного пользователя",
        responses={
            200: ProjectListSerializer(many=True),
            400: 'Bad request',
            404: 'Not found',
        }
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


