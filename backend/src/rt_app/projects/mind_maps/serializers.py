from rest_framework import serializers

from rt_app.models import MindMap


class MindMapListCreateSerializer(serializers.ModelSerializer):
    def validate_compress_background_url(self, value):
        if 'https://images.pexels.com/photos/' in value:
            return value
        raise serializers.ValidationError('Адрес картинки должен быть взят с https://images.pexels.com/')

    def create(self, validated_data):
        project = self.context.get('view').get_object()
        return MindMap.objects.create(**validated_data, project=project)

    class Meta:
        model = MindMap
        exclude = ('project',)