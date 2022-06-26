from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from drf_yasg.utils import swagger_auto_schema

from django.utils.decorators import method_decorator
from django.contrib.auth.models import User


class BaseUserSerializer(ModelSerializer):
    full_name = SerializerMethodField('get_full_name')

    def get_full_name(self, value: User):
        return value.get_full_name()

    class Meta:
        model = User
        fields = ('id', 'username', 'full_name')


class BaseTokenObtainPairSerializer(TokenObtainPairSerializer):
    user_serializer_class = BaseUserSerializer

    @classmethod
    def get_token(cls, user):
        token: RefreshToken = super().get_token(user)
        token['user'] = cls.user_serializer_class(user).data
        return token


class BaseTokenObtainPairView(TokenObtainPairView):
    serializer_class = BaseTokenObtainPairSerializer
