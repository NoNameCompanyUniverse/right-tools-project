from config.simplejwt import BaseTokenObtainPairView
from .serialzier import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(BaseTokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
