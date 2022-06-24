from rest_framework import serializers

from rt_app.models import KanbanBoard


class KanbanBoardDetailUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = KanbanBoard
        exclude = ('project',)