from rest_framework import serializers

from rt_app.models import User, Project


class ProfileInfoSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField('get_users_count')
    projects_with_me = serializers.SerializerMethodField('get_projects_with_me')
    projects_admin = serializers.SerializerMethodField('get_projects_admin')

    def get_users_count(self, obj):
        return User.objects.filter(is_active=True).count()

    def get_projects_with_me(self, obj):
        return Project.objects.prefetch_related('participant').filter(participant__in=[obj]).count()

    def get_projects_admin(self, obj):
        return Project.objects.select_related('admin').filter(admin=obj).count()

    class Meta:
        model = User
        fields = ('users', 'projects_with_me', 'projects_admin')
