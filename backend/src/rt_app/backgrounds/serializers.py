from rest_framework.serializers import ModelSerializer
from rt_app.models import Background


class BackgroundSerializer(ModelSerializer):
    class Meta:
        model = Background
        fields = '__all__'
