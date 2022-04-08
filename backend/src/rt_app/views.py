from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.permissions import AllowAny


class PingView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"response": "pong"}, status=HTTP_200_OK)
