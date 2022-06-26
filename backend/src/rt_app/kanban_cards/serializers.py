from drf_yasg.utils import swagger_serializer_method
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
    board = serializers.SerializerMethodField('get_board', read_only=True)

    @swagger_serializer_method(serializer_or_field=serializers.IntegerField())
    def get_board(self, obj: KanbanCard):
        return obj.kanban_column.position


    class Meta:
        model = KanbanCard
        fields = '__all__'
        read_only_fields = ('kanban_column', 'board')


class ChangeColumnSerializer(serializers.Serializer):
    kanban_column = serializers.IntegerField(allow_null=False, required=True)
