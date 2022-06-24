from drf_yasg.utils import swagger_serializer_method

from rest_framework import serializers

from rt_app.models import MindMap, MindCard, MindEdges


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
    id = serializers.SerializerMethodField('get_id')
    type = serializers.SerializerMethodField('get_type')

    @swagger_serializer_method(serializer_or_field=serializers.CharField())
    def get_id(self, obj: MindCard):
        return str(obj.pk)

    def get_type(self, obj: MindCard) -> str:
        return obj.get_type_card_display()

    class Meta:
        model = MindCard
        fields = ('id', 'name', 'description', 'type')


class NodesListSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField('get_id')
    type = serializers.SerializerMethodField('get_type')
    data = serializers.SerializerMethodField('get_data')
    position = serializers.SerializerMethodField('get_position')

    @swagger_serializer_method(serializer_or_field=serializers.CharField())
    def get_id(self, obj: MindCard):
        return str(obj.pk)

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
    def get_id(self, obj: MindEdges):
        return f'e{obj.source.pk}-{obj.target}'

    @swagger_serializer_method(serializer_or_field=serializers.CharField())
    def get_source(self, obj: MindEdges):
        return str(obj.source.pk)

    @swagger_serializer_method(serializer_or_field=serializers.CharField())
    def get_target(self, obj: MindEdges):
        return str(obj.target)

    class Meta:
        model = MindEdges
        fields = ('id', 'source', 'target')


class MindMapSerializer(serializers.ModelSerializer):
    nodes = NodesListSerializer(many=True)
    edges = EdgesListSerializer(many=True)

    class Meta:
        model = MindMap
        fields = ('nodes', 'edges')


class ChangePositionSerializer(serializers.Serializer):
    card = serializers.IntegerField(allow_null=False, required=True)
    x = serializers.IntegerField(allow_null=False, required=True)
    y = serializers.IntegerField(allow_null=False, required=True)


class EdgesSerializer(serializers.Serializer):
    id = serializers.CharField()
    source = serializers.IntegerField()
    target = serializers.IntegerField()