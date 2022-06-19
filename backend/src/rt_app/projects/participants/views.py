from django.http import Http404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import views, generics, status
from rest_framework.response import Response

from rt_app.models import Project

from ..views import BaseProjectDetailView

from .serializers import *
from .services import *


class ParticipantView(BaseProjectDetailView, generics.ListAPIView, generics.CreateAPIView, generics.DestroyAPIView):
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ParticipantListSerializer
        elif self.request.method in ['POST', 'DELETE']:
            return ParticipantCreateDeleteSerializer

    def get_queryset(self):
        return self.get_object().participant.all()

    @swagger_auto_schema(
        tags=['Участники проекта'], operation_summary="Вывести список участников проекта",
        responses={200: ParticipantListSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @swagger_auto_schema(
        tags=['Участники проекта'], operation_summary="Добавить участника проекта",
        request_body=ParticipantCreateDeleteSerializer,
        responses={200: ParticipantListSerializer(many=True)}
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = ParticipantCreateDeleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        participants = serializer.validated_data.pop('participants')
        participants = ParticipantService.validate_participants(self.get_object(), participants)
        participants = ParticipantService.add_participants(self.get_object(), participants)
        print(participants)
        serializer = ParticipantListSerializer(participants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        tags=['Участники проекта'], operation_summary="Удалить участников проекта проекта",
        request_body=ParticipantCreateDeleteSerializer,
        responses={200: ''}
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        serializer = ParticipantCreateDeleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        participants = serializer.validated_data.pop('participants')
        ParticipantService.remove_participants(self.get_object(), participants)
        return Response(status=status.HTTP_200_OK)



