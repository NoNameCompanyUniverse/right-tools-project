from rest_framework import serializers

from rt_app.models import KanbanBoard


class KanbanBoardListCreateSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        project = self.context.get('view').get_object()
        kanban_board = KanbanBoard.objects.create(**validated_data, project=project)
        kanban_board.kanbancolumn_set.create(name="Сделать", position=0)
        kanban_board.kanbancolumn_set.create(name="В процессе", position=1)
        kanban_board.kanbancolumn_set.create(name="На проверку", position=2)
        kanban_board.kanbancolumn_set.create(name="Сделано", position=3)
        return kanban_board

    class Meta:
        model = KanbanBoard
        exclude = ('project',)
