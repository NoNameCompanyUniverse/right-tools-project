from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .serializers import *


class CurrentUserView(ModelViewSet):
    permission_classes = [IsAuthenticated, ]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return UserSerializer
        else:
            return UpdateUserSerializer

# class UserView(ModelViewSet):
#     def get_serializer_class(self):
#         if
