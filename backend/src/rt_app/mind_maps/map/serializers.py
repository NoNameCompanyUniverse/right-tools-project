from drf_yasg.utils import swagger_serializer_method

from rest_framework import serializers

from rt_app.models import MindMap, MindCard


class PositionSerializer(serializers.ModelSerializer):
    x = serializers.SerializerMethodField('get_x')
    y = serializers.SerializerMethodField('get_y')

    @swagger_serializer_method(serializer_or_field=serializers.IntegerField())
    def get_x(self, obj: MindCard):
        return obj.x_coord

    @swagger_serializer_method(serializer_or_field=serializers.IntegerField())
    def get_y(self, obj: MindCard):
        return obj.y_coord

    class Meta:
        model = MindCard
        fields = ('x', 'y')


class MindCardBodySerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField('get_type')

    def get_type(self, obj: MindCard) -> str:
        return obj.get_type_card_display()

    class Meta:
        model = MindCard
        fields = ('id', 'name', 'description', 'type')


class NodesListSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField('get_type')
    data = serializers.SerializerMethodField('get_data')
    position = serializers.SerializerMethodField('get_position')

    @swagger_serializer_method(serializer_or_field=serializers.CharField())
    def get_type(self, obj: MindCard) -> str:
        return "nodeCard"

    @swagger_serializer_method(serializer_or_field=MindCardBodySerializer)
    def get_data(self, obj: MindCard) -> dict:
        return MindCardBodySerializer(obj).data

    @swagger_serializer_method(serializer_or_field=PositionSerializer)
    def get_position(self, obj: MindCard) -> dict:
        return PositionSerializer(obj).data

    class Meta:
        model = MindCard
        fields = ('id', 'type', 'data', 'position')


class EdgesListSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField('get_id')
    source = serializers.SerializerMethodField('get_source')
    target = serializers.SerializerMethodField('get_target')

    @swagger_serializer_method(serializer_or_field=serializers.CharField())
    def get_id(self, obj: MindCard):
        return f'e{obj.pk}-{obj.parent}'

    @swagger_serializer_method(serializer_or_field=serializers.IntegerField())
    def get_source(self, obj: MindCard):
        return obj.pk

    @swagger_serializer_method(serializer_or_field=serializers.IntegerField())
    def get_target(self, obj: MindCard):
        return obj.parent

    class Meta:
        model = MindCard
        fields = ('id', 'source', 'target')


class MindMapSerializer(serializers.ModelSerializer):
    nodes = serializers.SerializerMethodField('get_nodes')
    edges = serializers.SerializerMethodField('get_edges')

    @swagger_serializer_method(serializer_or_field=NodesListSerializer)
    def get_nodes(self, obj: MindMap):
        return NodesListSerializer(obj.mindcard_set.all().select_related('mind_map'), many=True)

    @swagger_serializer_method(serializer_or_field=EdgesListSerializer)
    def get_edges(self, obj: MindMap):
        return EdgesListSerializer(obj.mindcard_set.all().select_related('mind_map'), many=True)

    class Meta:
        model = MindMap
        fields = ('nodes', 'edges')
