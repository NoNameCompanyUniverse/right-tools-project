from rest_framework.permissions import BasePermission

from rt_app.models import Project


class IsOwner(BasePermission):
    message = "Вы не являетесь владельцем для выполнения данного действия."

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj: Project):
        if request.method in ['PUT', 'PATCH']:
            return obj.admin == request.user
        return True
