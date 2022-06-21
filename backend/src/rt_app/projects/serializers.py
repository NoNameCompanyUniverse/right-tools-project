from drf_yasg.utils import swagger_serializer_method
from rest_framework import fields, serializers

from rt_app.models import Project, User
from rt_app.common.serializers import ServiceSerializer


class UsersListSerializer(ServiceSerializer, serializers.ModelSerializer):
    online = serializers.SerializerMethodField('is_online', label="Онлайн ли пользователь")
    full_name = serializers.SerializerMethodField('get_full_name')

    class Meta:
        model = User
        fields = ('id', 'full_name', 'username', 'online', 'last_login', 'photo')
        read_only_fields = ('id', 'full_name', 'username', 'online', 'last_login', 'photo')
        write_only_fields = ('id',)


class ProjectListSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField(
        read_only=True, method_name='get_participants', label="Участники проекта"
    )

    @swagger_serializer_method(serializer_or_field=UsersListSerializer(many=True))
    def get_participants(self, project: Project) -> list:
        participants = project.participant.all()[:3]
        return UsersListSerializer(participants, many=True).data

    class Meta:
        model = Project
        fields = ('id', 'picture', 'name', 'participants', 'admin', 'description')


class ProjectDetailSerializer(serializers.ModelSerializer):
    admin = UsersListSerializer()

    class Meta:
        model = Project
        exclude = ('participant',)


class ProjectCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=150, required=True)
    description = serializers.CharField(allow_null=True, required=False, allow_blank=True)
    admin = UsersListSerializer(read_only=True)

    def create(self, validated_data):
        admin = self.context.get('request').user
        return Project.objects.create(**validated_data, admin=admin)

    class Meta:
        model = Project
        fields = ('id', 'name', 'description', 'picture', 'admin')


class ProjectUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=150, required=True)
    description = serializers.CharField(allow_null=False, required=False)
    admin = UsersListSerializer(read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'name', 'description', 'picture', 'admin')


class RequestCreateProjectSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150, required=True)
    description = serializers.CharField(allow_null=False, required=False)


class ResponseCreateProjectSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=150, required=True)
    description = serializers.CharField(allow_null=False, required=False)
    picture = serializers.ImageField(required=False)
    admin = UsersListSerializer(read_only=True)


class RequestUpdateProjectSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150, required=True)
    description = serializers.CharField(allow_null=False, required=False)


class ResponseUpdateProjectSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=150, required=True)
    description = serializers.CharField(allow_null=False, required=False)
    picture = serializers.ImageField(required=False)
    admin = UsersListSerializer(read_only=True)

