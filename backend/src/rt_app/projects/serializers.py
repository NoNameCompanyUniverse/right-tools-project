from rest_framework.serializers import (
    ModelSerializer,
    ListSerializer,
    SerializerMethodField,
    ManyRelatedField,
    PrimaryKeyRelatedField,
    IntegerField
)

from rt_app.models import Project, User
from rt_app.common.serializers import ServiceSerializer


class UsersListSerializer(ServiceSerializer, ModelSerializer):
    online = SerializerMethodField('is_online', label="Онлайн ли пользователь")

    class Meta:
        model = User
        fields = ('id', 'username', 'online', 'last_login', 'photo')


class ProjectListSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'picture', 'name', 'date_create')


class ProjectDetailSerializer(ModelSerializer):
    participant = ListSerializer(child=UsersListSerializer())

    class Meta:
        model = Project
        fields = '__all__'


class ProjectCreateUpdateSerializer(ModelSerializer):
    participant = ListSerializer(child=IntegerField(), allow_empty=False, required=True)

    def create(self, validated_data):
        return Project.objects.create(**validated_data, user=self.context.get('user'))

    class Meta:
        model = Project
        exclude = ('user',)

