from django.urls import path

from .views import *

urlpatterns = [
    path('', KanbanCardCreateView.as_view({'post': 'create'}))
]
