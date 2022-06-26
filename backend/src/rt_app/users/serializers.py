import datetime

from django.contrib.auth.password_validation import validate_password
from django.utils.timezone import now

from rest_framework.serializers import ModelSerializer, SerializerMethodField, Serializer
from rest_framework import fields
from rest_framework.exceptions import ValidationError

from rt_app.models import User
from rt_app.common.serializers import ServiceSerializer
from rt_app.subdivisions.serializers import SubdivisionShortInfoSerializer

from rt_app.image_service import services
from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile


class UserListSerializer(ServiceSerializer, ModelSerializer):
    full_name = SerializerMethodField('get_full_name')
    online = SerializerMethodField('is_online')
    subdivision = SubdivisionShortInfoSerializer()

    class Meta:
        model = User
        fields = (
            'id',
            'online',
            'last_login',
            'photo',
            'full_name',
            'username',
            'email',
            'subdivision'
        )


class UserShortInfoSerializer(ServiceSerializer, ModelSerializer):
    """Для вывода короткой инфы о юзере на главной странице"""
    full_name = SerializerMethodField('get_full_name')
    subdivision = SubdivisionShortInfoSerializer()

    class Meta:
        model = User
        fields = (
            'id',
            'photo',
            'username',
            'full_name',
            'is_staff',
            'subdivision',
        )


class UserDetailSerializer(ServiceSerializer, ModelSerializer):
    subdivision = SubdivisionShortInfoSerializer()
    online = SerializerMethodField('is_online')

    class Meta:
        model = User
        fields = (
            'id',
            'online',
            'last_login',
            'photo',
            'phone',
            'banner',
            'username',
            'first_name',
            'last_name',
            'email',
            'description',
            'date_birth',
            'is_staff',
            'subdivision'
        )


class UserCreateUpdateSerializer(ModelSerializer):
    username = fields.CharField(max_length=150, required=True)
    first_name = fields.CharField(max_length=150, required=True)
    last_name = fields.CharField(max_length=150, required=True)
    email = fields.EmailField(allow_null=True, allow_blank=True, required=False)
    description = fields.CharField(allow_null=True, required=False, allow_blank=True)
    date_birth = fields.DateField(allow_null=True, required=False)
    phone = fields.CharField(max_length=30, allow_null=True, required=False, allow_blank=True)

    def create(self, validated_data):
        time = now() - datetime.timedelta(minutes=20)
        return User.objects.create_user(**validated_data, last_login=time)

    def check_password(self, password):
        try:
            if password:
                validate_password(password)
                return password
        except Exception as e:
            raise ValidationError({"password": list(e)})
        else:
            raise ValidationError({"password": ["Пароль обязательное поле"]})

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'phone',
            'email',
            'description',
            'date_birth',
            'subdivision',
            'photo',
            'banner',
        )
        read_only_fields = ('__all__',)


class PasswordSerializer(Serializer):
    old_password = fields.CharField()
    new_password = fields.CharField()

    def validate_old_password(self, value):
        if self.context.user.check_password(value):
            return value
        raise ValidationError("Неверный пароль")

    def validate_new_password(self, value):
        validate_password(value)
        return value

    def save(self, **kwargs):
        return self.context.user.set_password(self.validated_data['new_password'])


class PhotoSerializer(Serializer):
    photo = fields.ImageField(allow_null=False, max_length=100, required=True)

    def save(self, **kwargs):
        photo = self.validated_data.get('photo')
        self.context.user.photo.save(photo.name, photo)
        return self.context.user.save()


class BannerSerializer(Serializer):
    banner = fields.ImageField(allow_null=False, max_length=100, required=True)

    def save(self, **kwargs):
        banner = self.validated_data.get('banner')
        self.context.user.banner.save(banner.name, banner)
        return self.context.user.save()
