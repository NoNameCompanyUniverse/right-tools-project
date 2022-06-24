from rest_framework import serializers

from rt_app.models import MindCard


class MindCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = MindCard
        exclude = ('mind_map',)


class MindCardUpdateSerializer(serializers.ModelSerializer):
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

    class Meta:
        model = MindCard
        exclude = ('mind_map',)