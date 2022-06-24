from rest_framework import serializers

from rt_app.models import KanbanBoard, KanbanColumn, KanbanCard


class KanbanCardCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100, required=True, allow_null=False)
    priority = serializers.ChoiceField(
        choices=(
            ('L', 'low'),
            ('A', 'average'),
            ('H', 'high'),
        ),
        allow_null=False,
        required=True,
    )
    description = serializers.CharField(required=False, allow_null=True)

    def create(self, validated_data):
        kanban_board: KanbanBoard = self.context.get('view').get_object()
        kanban_column: KanbanColumn = kanban_board.kanbancolumn_set.first()
        return kanban_column.kanbancard_set.create(**validated_data)

    class Meta:
        model = KanbanCard
        exclude = ('kanban_column',)
