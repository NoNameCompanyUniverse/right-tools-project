from django.utils.timezone import now
from rest_framework.serializers import Serializer

from rt_app.models import User


class RecursiveSerializer(Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class ServiceSerializer:
    def is_online(self, user: User) -> bool:
        if user.last_login is None:
            return False
        time = now()
        last_login = user.last_login
        dif = time - last_login
        if dif.seconds // 60 > 15:
            return False
        return True

    def get_full_name(self, user: User) -> str:
        return user.get_full_name()