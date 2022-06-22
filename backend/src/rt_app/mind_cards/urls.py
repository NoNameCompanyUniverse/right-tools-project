from django.urls import path

from .views import *

urlpatterns = [
    path('<int:pk>/', MindCardView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]
