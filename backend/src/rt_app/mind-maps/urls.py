from django.urls import path

from .views import *

urlpatterns = [
    # path('<int:pk>/open/', MindmapDetailView.as_view()),
    path('<int:pk>/', MindMapDetailUpdateDeleteView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]
