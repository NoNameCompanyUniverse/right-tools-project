from django.utils.decorators import method_decorator
from django.core.exceptions import ValidationError
from django.shortcuts import Http404

from drf_yasg.utils import swagger_auto_schema

from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK
from rest_framework import viewsets, views, parsers

from .permissions import *
from .serializers import *


class BaseUser:
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404


@method_decorator(name="retrieve", decorator=swagger_auto_schema(
    tags=['Текущий пользователь'], operation_summary="Текущий пользователь"
))
class CurrentUserView(viewsets.ModelViewSet):
    serializer_class = UserDetailSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return self.get_object()


@method_decorator(name="list", decorator=swagger_auto_schema(
    tags=['Пользователи'], operation_summary="Список пользователей"
))
@method_decorator(name="create", decorator=swagger_auto_schema(
    tags=['Пользователи'], operation_summary="Создать пользователя",
))
@method_decorator(name="retrieve", decorator=swagger_auto_schema(
    tags=['Пользователи'], operation_summary="Вывести информацию о пользователе"
))
@method_decorator(name="update", decorator=swagger_auto_schema(
    tags=['Пользователи'], operation_summary="Обновить информацию о пользователе"
))
@method_decorator(name="destroy", decorator=swagger_auto_schema(
    tags=['Пользователи'], operation_summary="Удалить пользователя",
))
class UserView(viewsets.ModelViewSet):
    permission_classes = [IsAdmin, IsOwner]

    queryset = User.objects.all().select_related('subdivision').order_by('pk')

    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        elif self.action == 'retrieve':
            return UserDetailSerializer
        else:
            return UserCreateUpdateSerializer

    def create(self, request, *args, **kwargs):
        serializer: UserCreateUpdateSerializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = self.request.data.get('password', None)
        serializer.check_password(password)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(password=self.request.data['password'])


class StaffView(BaseUser, views.APIView):
    permission_classes = [IsStaffOwner, IsSuperUser]

    @swagger_auto_schema(tags=['Пользователи'], operation_summary="Изменить роль пользователя в системе")
    def patch(self, request, pk):
        """Изменить роль может только пользователь с полем is_staff=True"""
        user = self.get_object(pk)
        self.check_object_permissions(request, user)
        user.is_staff = False if user.is_staff else True
        user.save()
        return Response(status=HTTP_200_OK)


class PasswordView(BaseUser, views.APIView):
    permission_classes = [IsOwner, ]

    @swagger_auto_schema(query_serializer=PasswordSerializer(), tags=['Пользователи'],
                         operation_summary="Изменить пароль")
    def patch(self, request, pk):
        user = self.get_object(pk)
        self.check_object_permissions(request, user)
        serializer: PasswordSerializer = PasswordSerializer(data=request.data, context=request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"code": HTTP_200_OK}, status=HTTP_200_OK)


class PhotoView(BaseUser, views.APIView):
    permission_classes = [IsOwner, ]

    parser_classes = (parsers.MultiPartParser, parsers.FormParser, parsers.FileUploadParser)

    @swagger_auto_schema(tags=['Пользователи'], operation_summary="Изменить фото", request_body=PhotoSerializer)
    def patch(self, request, pk):
        user = self.get_object(pk)
        self.check_object_permissions(request, user)
        serializer: PhotoSerializer = PhotoSerializer(data=request.data, context=request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"code": HTTP_200_OK}, status=HTTP_200_OK)


class BannerView(BaseUser, views.APIView):
    permission_classes = [IsOwner, ]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser, parsers.FileUploadParser]

    @swagger_auto_schema(tags=['Пользователи'], operation_summary="Изменить баннер", request_body=BannerSerializer)
    def patch(self, request, pk):
        user = self.get_object(pk)
        self.check_object_permissions(request, user)
        serializer: BannerSerializer = BannerSerializer(data=request.data, context=request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"code": HTTP_200_OK}, status=HTTP_200_OK)
