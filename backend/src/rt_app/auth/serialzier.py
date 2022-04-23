from config.simplejwt import BaseTokenObtainPairSerializer

from rt_app.users.serializers import UserShortInfoSerializer


class CustomTokenObtainPairSerializer(BaseTokenObtainPairSerializer):
    user_serializer_class = UserShortInfoSerializer
