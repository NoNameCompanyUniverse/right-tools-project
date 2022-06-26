from rest_framework import serializers

from rt_app.models import MindMap


class MindMapDetailUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MindMap
        exclude = ('project',)