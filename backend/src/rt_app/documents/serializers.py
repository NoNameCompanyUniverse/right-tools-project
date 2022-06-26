from rest_framework import serializers
from rt_app.models import Document


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id', 'file',)
        read_only_fields = ('id',)
