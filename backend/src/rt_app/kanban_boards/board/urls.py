from django.urls import path

from .views import *

urlpatterns = [
    path('', KanbanBoardView.as_view()),
]
