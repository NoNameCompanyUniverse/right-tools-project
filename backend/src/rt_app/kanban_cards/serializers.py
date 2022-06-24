from rest_framework import serializers

from rt_app.models import KanbanCard


class KanbanDetailCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = KanbanCard
        exclude = ('kanban_column',)


class KanbanCardUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100, required=True, allow_null=False)
    description = serializers.CharField(required=False, allow_null=True)
    priority = serializers.ChoiceField(
        choices=(
            ('L', 'low'),
            ('A', 'average'),
            ('H', 'high'),
        ),
        allow_null=False,
        required=True,
    )

    class Meta:
        model = KanbanCard
        exclude = ('kanban_column',)


class ChangeColumnSerializer(serializers.Serializer):
    kanban_column = serializers.IntegerField(allow_null=False, required=True)
