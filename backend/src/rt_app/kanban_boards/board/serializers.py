from drf_yasg.utils import swagger_serializer_method

from rest_framework import serializers

from rt_app.models import KanbanBoard, KanbanColumn, KanbanCard


class KanbanCardSerializer(serializers.ModelSerializer):
    board = serializers.SerializerMethodField('get_board')

    @swagger_serializer_method(serializer_or_field=serializers.IntegerField())
    def get_board(self, obj: KanbanCard):
        return obj.kanban_column.position

    class Meta:
        model = KanbanCard
        fields = '__all__'


class KanbanColumnSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    items = serializers.SerializerMethodField('get_items')

    @swagger_serializer_method(serializer_or_field=KanbanCardSerializer(many=True))
    def get_items(self, obj: KanbanColumn):
        cards = obj.kanbancard_set.all()
        return KanbanCardSerializer(cards, many=True).data

    class Meta:
        model = KanbanColumn
        exclude = ('kanban_board', 'position')

