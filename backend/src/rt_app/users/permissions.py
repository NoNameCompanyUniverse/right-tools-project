from rest_framework.permissions import BasePermission, IsAuthenticated
from rt_app.models import User


class IsSuperUser(BasePermission):
    message = "Вы не можете изменить статус у этого пользователя."

    def has_permission(self, request, view):
        return request.user and request.user.is_superuser


class IsStaffOwner(BasePermission):
    message = "Вы не можете изменить свой статус."

    def has_object_permission(self, request, view, obj: User):
        if request.method in ['PATCH']:
            return not (obj == request.user)
        return True


class IsAdmin(BasePermission):
    message = "Вы не являетесь администратором для выполнения данного действия."

    def has_permission(self, request, view):
        if request.method in ['POST', 'PATCH', 'DELETE']:
            return bool(request.user and request.user.is_staff)
        return True


class IsOwner(BasePermission):
    message = "Вы не являетесь владельцем для выполнения данного действия."

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj: User):
        if request.method in ['PUT', 'PATCH']:
            return obj == request.user
        return True
