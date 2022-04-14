from django.utils.timezone import now
from django.core.handlers.wsgi import WSGIRequest


class SetLastLoginMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: WSGIRequest):
        response = self.get_response(request)
        if request.user.is_authenticated:
            time = now()
            last_login = request.user.last_login
            dif = time - last_login
            if (dif.seconds // 60) >= 15:
                request.user.last_login = time
                request.user.save(update_fields=["last_login"])
        return response
