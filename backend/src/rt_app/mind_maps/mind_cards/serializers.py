from rest_framework import serializers

from rt_app.models import MindCard


class MindCardCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100, required=True, allow_null=False)
    description = serializers.CharField(required=False, allow_null=True)
    type_card = serializers.ChoiceField(
        choices=(
            ('S', 'source'),
            ('D', 'default'),
            ('T', 'target'),
        ),
        allow_null=False,
        required=True,
    )
    x_coord = serializers.IntegerField(allow_null=False, default=0)
    y_coord = serializers.IntegerField(allow_null=False, default=0)

    def create(self, validated_data):
        mind_map = self.context.get('view').get_object()
        return MindCard.objects.create(**validated_data, mind_map=mind_map)

    class Meta:
        model = MindCard
        exclude = ('mind_map',)
