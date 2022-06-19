from rest_framework import serializers

from rt_app.models import Project


class PictureSerializer(serializers.ModelSerializer):
    picture = serializers.ImageField(allow_null=True, max_length=100, required=False)

    def save(self, **kwargs):
        project = self.instance
        project.picture = self.validated_data.get('picture')
        return project.save()

    class Meta:
        model = Project
        fields = ('picture',)
