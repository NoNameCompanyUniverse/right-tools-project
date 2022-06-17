from rest_framework import fields, serializers
from rt_app.models import Project, User
from rt_app.common.serializers import ServiceSerializer


class UsersListSerializer(ServiceSerializer, serializers.ModelSerializer):
    online = serializers.SerializerMethodField('is_online', label="Онлайн ли пользователь")

    class Meta:
        model = User
        fields = ('id', 'username', 'online', 'last_login', 'photo')


class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'picture', 'name', 'date_create')


class ProjectDetailSerializer(serializers.ModelSerializer):
    admin = UsersListSerializer()

    class Meta:
        model = Project
        exclude = ('participant',)


class ProjectCreateUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=150, required=True)
    description = serializers.CharField(allow_null=False, required=False)

    def create(self, validated_data):
        admin = self.context.get('request').user
        return Project.objects.create(**validated_data, admin=admin)

    class Meta:
        model = Project
        fields = ('id', 'name', 'description')


class PictureSerializer(serializers.ModelSerializer):
    picture = serializers.ImageField(allow_null=True, max_length=100, required=False)

    class Meta:
        model = Project
        fields = ('picture',)

