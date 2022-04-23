from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

from .views import *

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]