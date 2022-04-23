from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema


class PingView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(tags=['Для бэкенда'], operation_summary='Команда для дергания сервера')
    def get(self, request):
        return Response({"response": "pong"}, status=HTTP_200_OK)
