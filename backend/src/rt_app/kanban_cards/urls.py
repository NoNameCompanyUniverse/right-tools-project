from django.urls import path

from .views import *

urlpatterns = [
    path('<int:pk>/', KanbanCardView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]
