from rest_framework import serializers
from rt_app.models import Document, Project


class DocumentSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_name', label="Название")
    size = serializers.SerializerMethodField('get_size', label="Размер")
    format = serializers.SerializerMethodField('get_format', label="Формат")

    def get_name(self, obj: Document):
        return obj.file.name.split('/')[-1]

    def get_size(self, obj: Document):
        return obj.file.size

    def get_format(self, obj: Document):
        return obj.file.name.split('.')[-1]

    def create(self, validated_data):
        project: Project = self.context['view'].get_object()
        return Document.objects.create(**validated_data, project=project)

    class Meta:
        model = Document
        fields = ('id', 'file', 'name', 'size', 'format', 'project', )
        read_only_fields = ('id', 'name', 'size', 'format', 'project', )


class DocumentCreateSerializer(serializers.ModelSerializer):
    file = serializers.FileField(required=True)

    class Meta:
        model = Document
        fields = ('id', 'file',)
