from django.urls import path, include

from .views import *

urlpatterns = [
    path('<int:pk>/', KanbanBoardDetailUpdateDeleteView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('<int:pk>/cards/', include('rt_app.kanban_boards.card.urls')),
    path('<int:pk>/board/', include('rt_app.kanban_boards.board.urls')),
]
