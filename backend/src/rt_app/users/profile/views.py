from django.shortcuts import Http404
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework import views, status, generics

from rt_app.models import Project, User

from rt_app.projects.serializers import ProjectListSerializer

from .serializers import *


class BaseUserView:
    def get_object(self, pk=None):
        if pk:
            try:
                return User.objects.get(pk=pk)
            except User.DoesNotExist:
                raise Http404
        else:
            return self.request.user


class ProfileInfoView(BaseUserView, views.APIView):
    @swagger_auto_schema(
        tags=['Текущий пользователь', 'Пользователи'],
        operation_summary="Информация на главной странице",
        responses={
            200: ProfileInfoSerializer(read_only=True),
            400: 'Bad request',
            404: 'Not found',
        }
    )
    def get(self, request, *args, **kwargs):
        user = self.get_object(pk=kwargs.get('pk'))
        serializer = ProfileInfoSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileProjectsView(BaseUserView, generics.ListAPIView):
    serializer_class = ProjectListSerializer

    def get_queryset(self):
        user = self.get_object(pk=self.kwargs.get('pk'))
        return Project.objects\
            .select_related('admin')\
            .prefetch_related('participant')\
            .filter(Q(admin=user) | Q(participant__in=[user]))\
            .distinct()\
            .order_by('pk')

    @swagger_auto_schema(
        tags=['Текущий пользователь', 'Пользователи'],
        operation_summary="Информация проектах для данного пользователя",
        responses={
            200: ProjectListSerializer(many=True),
            400: 'Bad request',
            404: 'Not found',
        }
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


