from rest_framework import serializers

from rt_app.models import MindMap


class MindMapListCreateSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        project = self.context.get('view').get_object()
        return MindMap.objects.create(**validated_data, project=project)

    class Meta:
        model = MindMap
        exclude = ('project',)