from rest_framework.serializers import ListSerializer


class FilterSubdivisionListSerializer(ListSerializer):
    def to_representation(self, data):
        data = data.filter(parent=None)
        return super().to_representation(data)
