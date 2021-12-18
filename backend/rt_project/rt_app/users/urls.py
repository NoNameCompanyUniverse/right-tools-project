from django.urls import path, include
from .views import *

urlpatterns = [
    path('me/', CurrentUserView.as_view({"get": "retrieve", "put": "update"})),
]
