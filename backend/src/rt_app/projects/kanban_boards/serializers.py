from rest_framework import serializers

from rt_app.models import KanbanBoard


class KanbanBoardListCreateSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        project = self.context.get('view').get_object()
        return KanbanBoard.objects.create(**validated_data, project=project)

    class Meta:
        model = KanbanBoard
        exclude = ('project',)
