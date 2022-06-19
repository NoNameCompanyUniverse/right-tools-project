from django.urls import path, include

from .views import *

urlpatterns = [
    path('', ProjectView.as_view({'get': 'list', 'post': 'create'})),
    path('<int:pk>/', ProjectView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('<int:pk>/kanban_boards/', include('rt_app.projects.kanban_boards.urls')),
    path('<int:pk>/documents/', include('rt_app.projects.documents.urls')),
    path('<int:pk>/mind_maps/', include('rt_app.projects.mind_maps.urls')),
    path('<int:pk>/participants/', include('rt_app.projects.participants.urls')),
    path('<int:pk>/picture/', include('rt_app.projects.picture.urls')),
]
