from rest_framework.serializers import ModelSerializer
from rest_framework.fields import CharField, IntegerField
from .exceptions import *
from rt_app.models import Subdivision
from rt_app.common.serializers import RecursiveSerializer

from .filters import FilterSubdivisionListSerializer


class SubdivisionTreeSerializer(ModelSerializer):
    """Сериалайзер для вывода подразделений в виде дерева"""
    children = RecursiveSerializer(many=True)

    class Meta:
        model = Subdivision
        list = FilterSubdivisionListSerializer
        exclude = ('description', 'parent')


class SubdivisionSerializer(ModelSerializer):
    name = CharField(min_length=3, max_length=100, allow_null=False, required=True)
    description = CharField(allow_null=True, required=False)
    level = IntegerField(min_value=1, max_value=4, required=True)

    def check_parent(self, instance: Subdivision = None):
        parent = self.validated_data.get('parent', None)

        if self.context['request'].method == 'PUT':
            if (instance.parent is None) and (parent is not None):
                raise SubdivisionException("Нельзя изменить уровень главного подразделения.")
            if (instance.parent is not None) and (parent is None):
                raise SubdivisionException("Нельзя сделать подразделеение главным.")
        else:
            if parent is None:
                raise SubdivisionException("Главное подразделение уже существует.")

    def check_name(self):
        if Subdivision.objects.filter(name=self.validated_data.get('name')).exists():
            raise SubdivisionNameExist()
        return

    def check_level(self, instance: Subdivision = None):
        level = self.validated_data.get('level')

        if self.context['request'].method == 'PUT':
            if instance.parent is None:
                if instance.level == level:
                    return
                if (instance.level+1) != level:
                    raise LevelException()
            if (instance.parent.level + 1) != level:
                raise LevelException()
        else:
            parent = self.validated_data.get('parent', None)
            if (parent.level + 1) != level:
                raise LevelException()

    class Meta:
        model = Subdivision
        fields = ('id', 'name', 'description', 'level', 'parent')


class SubdivisionShortInfoSerializer(ModelSerializer):
    class Meta:
        model = Subdivision
        fields = ('id', 'name')
