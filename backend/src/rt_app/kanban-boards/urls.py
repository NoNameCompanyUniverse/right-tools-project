from django.urls import path

from .views import *

urlpatterns = [
    # path('<int:pk>/open/', MindmapDetailView.as_view()),
    path('<int:pk>/', KanbanBoardDetailUpdateDeleteView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]
